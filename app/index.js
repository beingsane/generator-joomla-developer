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
				type: 'confirm',
				name: 'someOption',
				message: 'Would you like to enable this option?',
				default: true
			},
			{
				type : 'input',
				name : 'author',
				message : 'Enter default author for Joomla Development',
				store : true
			}
		];

		this.prompt(prompts, function (props) {
			this.someOption = props.someOption;
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
				repo: "git://github.com/joomla/joomla-cms",
				dir: 'joomla'
			}, this.cloneCallback);
		}
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
