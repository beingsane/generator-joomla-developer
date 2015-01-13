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
				name : 'githubUser',
				message : 'Enter username for GitHub Account containg the  Joomla Repository you wish to clone for your development instance:',
				store : true
			},
			{
				type : 'input',
				name : 'githubRepo',
				message : 'Enter name for the GitHub Joomla Repository you wish to clone for your development instance:',
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
				default: 'GNU General Public License version 2 or later; see LICENSE.txt',
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
				message : 'Enter default website for development on this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'languagecode',
				message : 'Enter default language code for development on this Joomla instance:',
				default: 'en-GB',
				store : true
			},
			{
				type : 'input',
				name : 'destinationRepo',
				message : 'Enter destination repository name forthis particular development instance:',
				store : true
			},
			{
				type : 'input',
				name : 'url',
				message : 'Enter local URL for development off this Joomla instance:',
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
				type : 'db_server',
				name : 'url',
				message : 'Enter database url for this Joomla instance:',
				store : true
			},
			{
				type : 'input',
				name : 'db_name',
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

			this.url = props.url;
			this.githubUser = props.githubUser;
			this.githubRepo = props.githubRepo;
			this.destinationRepo = props.destinationRepo;

			this.db_user = props.db_user;
			this.db_password = props.db_password;
			this.db_server = props.db_server;
			this.db_name = props.db_name;
			this.db_prefix = props.db_prefix;

			this.config.defaults(props);

			done();
		}.bind(this));

	},

	writing: {

		app: function () {
			var concat =
			{
				options:
				{
					separator: ';'
				},
				dist:
				{
					src: ['./src/data/set.js', './src/data/dictionary.js'],
					dest: './dist/<%= pkg.name %>.js'
				}
			};

			//this.gruntfile.insertConfig(concat);
			//this.gruntfile.registerTask('build', 'concat');

			this.fs.copy(
				this.templatePath('_package.json'),
				this.destinationPath('package.json')
			);

			this.fs.copy(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json')
			);

			this.fs.copy(
				this.templatePath('libs/compiler.jar'),
				this.destinationPath('libs/compiler.jar')
			);

			this.fs.copy(
				this.templatePath('mysql.backup.js'),
				this.destinationPath('database/mysql.backup.js')
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
				repo: "https://github.com/" + this.githubUser + "/" + this.githubRepo + ".git",
				dir: 'joomla'
			}, this.cloneCallback);
		},

		install: function()
		{
			var childArgs = [path.join(__dirname, 'installation.js'), this.config.getAll()];

			childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
				console.log('err');
				console.log(err);
				console.log('stdout');
				console.log(stdout);
				console.log('stderr');
				console.log(stderr);
			})
		}

	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
