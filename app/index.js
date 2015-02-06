'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var Git = require('git-tools');
var md5 = require('MD5');
var path = require('path');
var random = require('random-ext');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var fs = require('fs');
var binPath = phantomjs.path;

module.exports = yeoman.generators.Base.extend({

	initialize: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the ' + chalk.red('JoomlaDeveloper') + ' generator!'
		));

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
				message : 'Enter Git Repository URL Joomla Repository you wish to clone for your development instance:',
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



			props.path = this.destinationRoot().replace(/\\/g, "\\");
			props.packageName = props.name.replace(/\s+/g, '-').toLowerCase();

			this.website = props.website;
			this.path = props.path;
			this.repositoryUrl = props.repositoryUrl;
			this.repositoryName = props.repositoryName;
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

			var params = this.config.getAll();

			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				params
			);

			this.fs.copy(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json')
			);

			this.fs.copyTpl(
				this.templatePath('_gruntfile.js'),
				this.destinationPath('gruntfile.js'),
				params
			);

			this.fs.copy(
				this.templatePath('tasks/**/*'),
				this.destinationPath('tasks/')
			);

			this.fs.copy(
				this.templatePath('index.html'),
				this.destinationPath('database/index.html')
			);

			this.fs.copy(
				this.templatePath('index.html'),
				this.destinationPath('build/index.html')
			);

		},

		projectfiles: function () {
			this.fs.copy(
				this.templatePath('editorconfig'),
				this.destinationPath('.editorconfig')
			);
			this.fs.copy(
				this.templatePath('jshintrc'),
				this.destinationPath('.jshintrc')
			);
		},

		clone: function() {

			var params = this.config.getAll();

			console.log(params);

			this.log(yosay(	chalk.yellow('Cloning Joomla CMS Repository')));

			this.writeCallBack = function(err) {

				if (err)
				{
					console.log(err);
					return false;
				}

				this.log(yosay(chalk.yellow('Running GruntJs tasks to finalize')));

				this.npmInstall();
				
				this.spawnCommand('grunt', ['cleanup'], function(err, stdout, stderr){

					if (err)
					{
						console.log(err);
						return false;
					}

					this.log(yosay(chalk.yellow('Finished!')));
				});

			}.bind(this);

			this.replaceCallBack = function(err, data) {
				this.log(yosay(chalk.yellow('Replacing sql file prefixes...')));

				if (err)
				{
					console.log(err);
					return false;
				}

				data = data.replace(/#__/g, this.db_prefix);

				fs.writeFile('./database/joomla.sql', data, 'utf-8', this.writeCallBack);
			}.bind(this);

			this.cloneCallBack = function(err, repo) {

				if (err)
				{
					console.log(err);
					return false
				}

				console.log(params);

				this.fs.copyTpl(
					this.templatePath('_configuration.php'),
					this.destinationPath(this.repositoryName + '/configuration.php'),
					params
				);

				this.fs.copy(
					this.templatePath('_htaccess.txt'),
					this.destinationPath(this.repositoryName + '/.htaccess')
				);

				this.log(yosay(chalk.yellow('Repository cloning done...')));

				fs.readFile('./' + this.repositoryName + '/installation/sql/mysql/joomla.sql', 'utf-8', this.replaceCallBack);
			}.bind(this);

			Git.clone({
				repo: this.repositoryUrl,
				dir: this.repositoryName
			}, this.cloneCallBack);
		},
	},
	install: function() {
		if (this.options['skip-install'] !== true) {
			this.installDependencies();
		}
	}
});
