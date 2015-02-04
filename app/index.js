'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var Git = require('git-tools');

var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path

module.exports = yeoman.generators.Base.extend({

	initializing: function () {
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
				message : 'Enter name for this Joomla instance:'
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

			props.path = this.destinationRoot();
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

			this.config.defaults(props);

			done();
		}.bind(this));

	},

	writing: {

		app: function () {

			var params = this.config.getAll();

			console.log(params);

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
				this.templatePath('tasks/*.js'),
				this.destinationPath('tasks/')
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
			this.log(yosay(
					chalk.yellow('Cloning Joomla CMS Repository')
			));

			this.cloneCallback = function(error, repo) {
				console.log(error);
				console.log(repo);
			};

			Git.clone({
				repo: this.repositoryUrl,
				dir: this.repositoryName
			}, this.cloneCallback);
		},

		install: function()
		{
			//var childArgs = [path.join(__dirname, 'installation.js'), this.config.getAll()];

			//childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
				//console.log('err');
				//console.log(err);
				//console.log('stdout');
				//console.log(stdout);
				//console.log('stderr');
				//console.log(stderr);
			//})
		}

	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
