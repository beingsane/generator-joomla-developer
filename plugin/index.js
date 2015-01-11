'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({

	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the ' + chalk.red('JoomlaDeveloper') + ' plugin generator!'
		));

		var prompts =
		[
			{
				type : 'input',
				name : 'camelcase',
				message : 'What is name of the new plugin using CamelCase formatting?',
				store : true
			},
			{
				type : 'list',
				name : 'pluginType',
				message : 'What type of plugin are you creating?',
				choices: ['Authentication','Captcha','Content','Editors','Editors-xtd','Finder','Quickicon','Search','System','Twofactorauth','User'],
				store : true
			}
		];

		this.prompt(prompts, function (props) {
			this.camelcase = props.camelcase;
			this.pluginType = props.pluginType;
			done();
		}.bind(this));
	},

	writing: {
		plugin: function () {
			var months = ['January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'];
			var date = new Date();
			
			var params = {
					plugin: this.camelcase.toLowerCase(),
					type: this.pluginType,
					author: this.author || this.config.get('author'),
					created: months[date.getMonth()] + ' ' + date.getFullYear(),
					copyright: this.copyright || this.config.get('copyright'),
					license: this.license || this.config.get('license'),
					email: this.email || this.config.get('email'),
					website: this.website || this.config.get('website'),
					version: '0.0.0',
					description: this.description,
					uppercase: this.camelcase.toUpperCase(),
					camelcase: this.camelcase,
					languagefile: false,
					languagecode: this.languagecode || this.config.get('languagecode'),
					mediafolder: false,
					triggers: {
						onUserLogin: false,
						onUserLogout: false,
						onUserAuthenticate: false,
						onUserLoginFailure: false,
						onUserAfterLogin: false,
						onUserBeforeSave: false,
						onUserAfterSave: false,
						onUserBeforeDelete: false,
						onUserAfterDelete: false,
						onExtensionAfterInstall: false,
						onExtensionAfterUninstall: false,
						onExtensionAfterUpdate: false,
						onContentPrepare: false,
						onContentAfterTitle: false,
						onContentBeforeDisplay: false,
						onContentAfterDisplay: false,
						onContentBeforeSave: false,
						onContentAfterSave: false,
						onContentPrepareForm: false,
						onContentPrepareData: false,
						onContentBeforeDelete: false,
						onContentAfterDelete: false,
						onContentChangeState: false,
						onContentSearch: false,
						onContentSearchAreas: false,
						onCategoryChangeState: false,
						onValidateContact: false,
						onSubmitContact: false,
						onGetIcons: false
						// MANY MORE TO ADD
						
						
					}
				};
				
			var plugins = this.config.get('plugins');
			plugins.push(params);
			this.config.set('plugins', plugins);
			
			this.fs.copyTpl(
				this.templatePath('_manifest.xml'),
				this.destinationPath('joomla/plugins/' + params.type + '/' + params.plugin + '/' + params.plugin + '.xml'),
				params
			);

			this.fs.copyTpl(
					this.templatePath('_plugin.php'),
					this.destinationPath('joomla/plugins/' + params.type + '/' + params.plugin + '/' + params.plugin + '.php'),
					params
				);

			if (params.languagefile === true && typeof params.languagecode !== "undefined")
			{

				this.fs.copyTpl(
					this.templatePath('_language.ini'),
					this.destinationPath('joomla/administrator/language/' + params.languagecode + '/' + params.languagecode + '.plg_' + params.type + '_' + params.plugin + '.ini'),
					params
				);

				this.fs.copyTpl(
					this.templatePath('_language.sys.ini'),
					this.destinationPath('joomla/administrator/language/' + params.languagecode + '/' + params.languagecode + '.plg_' + params.type + '_' + params.plugin + '.sys.ini'),
					params
				);

			}

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('joomla/plugins/plg_' + params.type + '_' + params.plugin + '/index.html')
			);
		}
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
