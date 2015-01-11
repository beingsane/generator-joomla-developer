'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var Git = require('git-tools');

var branches;

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
		];

		this.prompt(prompts, function (props) {
			props.components = [];
			props.modules = [];
			props.plugins = [];
			props.templates = [];
			props.libraries = [];
			props.packages = [];
			this.githubUser = props.githubUser;
			this.githubRepo = props.githubRepo;
			this.config.defaults(props);
			done();
		}.bind(this));

	},

	writing: {
		app: function () {
			this.fs.copy(
				this.templatePath('_package.json'),
				this.destinationPath('package.json')
			);

			this.fs.copy(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json')
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

		}

	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
