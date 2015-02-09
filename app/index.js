'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var Git = require('git-tools');
var md5 = require('MD5');
var path = require('path');
var random = require('random-ext');
var cp = require('child_process');
var phantomjs = require('phantomjs');
var base = require('js-base64').Base64;
var fs = require('fs');
var async = require('async');
var open = require('open');
var rimraf = require('rimraf');
var Download = require('download');
var progress = require('download-status');
var mysql = require('mysql');
var binPath = phantomjs.path;

module.exports = yeoman.generators.Base.extend({

	initializing: function () {
		this.log(yosay('Welcome to the ' + chalk.red('JoomlaDeveloper') + ' generator!'));

		this.pkg = require('../package.json');

	},

	prompting: function () {

		var done = this.async();

		this.log(yosay('Joomla Instance Information'));

		var prompts =
		[
			{
				type : 'input',
				name : 'name',
				message : 'Enter name for this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'version',
				message : 'Enter version for this Joomla instance:',
				"default": '0.1.0'
			},
			{
				type : 'input',
				name : 'websiteEmail',
				message : 'Enter administrator\'s email for this Joomla instance:',
				store: true
			},
			{
				type : 'input',
				name : 'websitePassword',
				message : 'Enter administrator\'s password for this Joomla instance:',
				store: true
			},
			{
				type : 'input',
				name : 'url',
				message : 'Enter local URL for development off this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'repositoryName',
				message : 'Enter Git Repository Name Joomla Repository you wish to clone for your development instance:',
				store : true
			},
			{
				type : 'input',
				name : 'repositoryUrl',
				message : 'Enter Git Repository URL for this Joomla development instance:',
				store : true
			},
			{
				type : 'confirm',
				name : 'repositoryExisting',
				message : 'Is there already a Joomla CMS code base in the above repository:',
				"default": false,
				store : true
			},
			{
				type : 'input',
				name : 'author',
				message : 'Enter default author for development on this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'copyright',
				message : 'Enter default copyright for development on this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'license',
				message : 'Enter default license for development on this Joomla instance:',
				"default": 'GNU General Public License version 2 or later; see LICENSE.txt',
				store : true
			},
			{
				type : 'input',
				name : 'email',
				message : 'Enter default email for development on this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'website',
				message : 'Enter local URL for development off this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'languagecode',
				message : 'Enter default language code for development on this Joomla instance:',
				"default": 'en-GB',
				store : true
			},
			{
				type : 'input',
				name : 'db_user',
				message : 'Enter database user for this Joomla instance:',
				store: true
			},
			{
				type : 'input',
				name : 'db_password',
				message : 'Enter database password for this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'db_host',
				message : 'Enter database url for this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'db_database',
				message : 'Enter database name for this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'db_prefix',
				message : 'Enter database prefix for this Joomla instance:',
				store : true
			},

		];

		this.prompt(prompts, function (props) {
			props.components = [];
			props.modules = [];
			props.plugins = [];
			props.templates = [];
			props.libraries = [];
			props.packages = [];
			props.submodules = [];

			props.path = this.destinationRoot().replace(/\\/g, "\\\\").replace(" ","\\ ");
			props.packageName = props.name.replace(/\s+/g, '-').toLowerCase();

			this.websiteEmail = props.websiteEmail;
			this.websitePassword = props.websitePassword;

			this.website = props.website;
			this.path = props.path;
			this.repositoryUrl = props.repositoryUrl;
			this.repositoryName = props.repositoryName;
			this.repositoryExisting = props.repositoryExisting;
			this.name = props.name;
			this.version = props.version;

			this.db_user = props.db_user;
			this.db_password = props.db_password;
			this.db_host = props.db_host;
			this.db_database = props.db_database;
			this.db_prefix = props.db_prefix;

			var str = random.string(20);

			props.secret = md5(str);

			this.config.defaults(props);

			done();
		}.bind(this));

	},

	writing: {

		app: function () {

			var done = this.async();
			var params = this.config.getAll();

			var ioFileOperations = function(src, dest, tpl)
			{

				if (tpl)
				{
					this.fs.copyTpl(
						this.templatePath(src),
						this.destinationPath(dest),
						params
					);
				}
				else
				{
					this.fs.copy(
						this.templatePath(src),
						this.destinationPath(dest)
					);
				}

			}.bind(this);;

			async.series([
					ioFileOperations('_package.json', 'package.json', true),
					ioFileOperations('_bower.json', 'bower.json', true),
					ioFileOperations('_gruntfile.js', 'gruntfile.js', true),
					ioFileOperations('tasks/**/*', 'tasks/', false),
					ioFileOperations('index.html', 'database/index.html', false),
					ioFileOperations('index.html', 'build/index.html', false),
					ioFileOperations('editorconfig', '.editorconfig', false),
					ioFileOperations('jshintrc', '.jshintrc', false),
					ioFileOperations('_configuration.php', this.repositoryName + '/configuration.php', true),
					ioFileOperations('_htaccess.txt', this.repositoryName + '/.htaccess', false),
					ioFileOperations('README.md', this.repositoryName + '/README.md', false)
				]);

			done();
		},

		clone: function() {

			//var done = this.async();

			var params = this.config.getAll();

			this.log(yosay(	chalk.yellow('Acquiring Joomla CMS files')));

			this.finished = function() {
				this.log(yosay(chalk.yellow('Finished!')));

				open(this.config.get('url') + '/administrator');

			}.bind(this);

			this.createUserCallBack = function(error, stdout, stderr) {

				if (error)
				{
					console.log(error);
					return false;
				}

				this.log(yosay(chalk.yellow('Administrator\'s Account Created')));

				var connection = mysql.createConnection({
					host: this.db_host,
					user: this.db_user,
					password: this.db_password,
					database: this.db_database
				});

				connection.connect();

				function activateUser(db_prefix)
				{
					connection.query('UPDATE `' + db_prefix + 'users` SET block=0,activation="" WHERE id=1', function(err, rows, fields) {
						if (err)
						{
							throw err;
						}
					});
				};

				function updateUserGroup(db_prefix)
				{
					connection.query('UPDATE `' + db_prefix + 'user_usergroup_map` SET group_id=8 WHERE user_id=1', function(err, rows, fields) {
						if (err)
						{
							throw err;
						}
					});
				}

				async.series(
					[
						activateUser(this.db_prefix),
						updateUserGroup(this.db_prefix)
					]
				);

				connection.end();

				this.finished();

			}.bind(this);

			this.deleteInstallationDirectoryCallBack = function() {

				this.log(yosay(chalk.yellow('Installation Folder Removed')));

				cp.exec('casperjs installation.js --password=' + base.encode(this.websitePassword) + ' --email=' + this.websiteEmail, { cwd: this.templatePath("tasks/scripts") }, this.createUserCallBack);

			}.bind(this);

			this.importCallBack = function(err) {

				if (err)
				{
					this.log(err);
					return false;
					//done(err);
				}

				this.log(yosay(chalk.yellow('Database import complete')));

				rimraf(this.destinationRoot() + '/' + this.repositoryRoot + '/installation/', this.deleteInstallationDirectoryCallBack);

			}.bind(this);

			this.writeCallBack = function(err) {

				if (err)
				{
					this.log(err);
					return false;f
					//done(err);
				}

				this.log(yosay(chalk.yellow('Running database script...')));
				console.log(this.destinationRoot() + '/database/joomla.sql');

				cp.exec('mysql --user=' + params.db_user + ' --password=' + params.db_password + ' ' + params.db_database + ' < ' + params.path + '/database/joomla.sql', this.importCallBack);

			}.bind(this);

			this.replaceCallBack = function(err, data) {
				this.log(yosay(chalk.yellow('Replacing sql file prefixes...')));

				if (err)
				{
					this.log(err);
					return false;
					//done(err);
				}

				data = data.replace(/#__/g, this.db_prefix);

				fs.writeFile('./database/joomla.sql', data, 'utf-8', this.writeCallBack);

			}.bind(this);

			this.cloneCallBack = function(err, repo) {

				if (err)
				{
					this.log(err);
					return false;
					//done(err);
				}

				this.log(yosay(chalk.yellow('Joomla CMS files acquired...')));

				var params = this.config.getAll();

				this.fs.copyTpl(
					this.templatePath('_configuration.php'),
					this.destinationPath(this.repositoryName + '/configuration.php'),
					params
				);

				this.fs.copy(
					this.templatePath('_htaccess.txt'),
					this.destinationPath(this.repositoryName + '/.htaccess')
				);

				fs.readFile('./' + this.repositoryName + '/installation/sql/mysql/joomla.sql', 'utf-8', this.replaceCallBack);

			}.bind(this);

			if (this.repositoryExisting)
			{

				Git.clone({
					repo: this.repositoryUrl,
					dir: this.repositoryName
				}, this.cloneCallBack);

			}
			else
			{

				var download = new Download({ extract: true, strip: 1, mode: '755' })
					.get(this.repositoryUrl.replace('.git','') + '/archive/master.zip')
					.dest(this.destinationPath(this.repositoryName))
					.use(progress()
				);

				download.run(function (err, files, stream) {

					if (err) {
						throw err;
						return false
						//done(err);
					}

					this.log(yosay(chalk.yellow('Joomla Files downloaded successfully!')));

					this.cloneCallBack(false, {});

				}.bind(this));
			}
		},

	},

	install: function() {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});