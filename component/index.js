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
			'Welcome to the ' + chalk.red('JoomlaDeveloper') + ' component generator!'
		));

		var prompts =
		[
			{
				type : 'input',
				name : 'camelcase',
				message : 'What is name of the new component using CamelCase formatting?',
				store : true
			}
		];

		this.prompt(prompts, function (props) {
			this.camelcase = props.camelcase;
			done();
		}.bind(this));
	},

	writing: {
		component: function () {

			var months = ['January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'];
			var date = new Date();

			var params = {
					component: this.camelcase.toLowerCase(),
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
					languagefile: true,
					languagecode: this.languagecode || this.config.get('languagecode'),
					mediafolder: false,
					acl: true,
					db: {
						fields: {
							categories: true,
							publish: true,
							timestamp: true,
							urls: true,
							metadata: true,
							params: true,
							images: true,
							language: true,
							tags: true
						}
					},
					views: {
						bare: false,
						standard: {
							listview: {
								camelcase: 'Widgets',
								lowercase: 'widgets',
								uppercase: 'WIDGETS'
							},
							detailview:{
								camelcase: 'Widget',
								lowercase: 'widget',
								uppercase: 'WIDGET'
							},
						}
					}
				};


			var components = this.config.get('components');
			components.push(params);
			this.config.set('components', components);

			console.log('Added new component to yo manifest...');

			// template out admin root folder files
			this.fs.copyTpl(
				this.templatePath('_manifest.xml'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/' + params.component + '.xml'),
				params
			);

			console.log('Manifest');

			this.fs.copyTpl(
				this.templatePath('_admin_component.php'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/' + params.component + '.php'),
				params
			);

			console.log('Generated component.php file...');

			this.fs.copyTpl(
				this.templatePath('_admin_controller.php'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/controller.php'),
				params
			);

			console.log('Generated controller.php file...');

			this.fs.copyTpl(
				this.templatePath('_access.xml'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/access.xml'),
				params
			);

			console.log('Generated access.xml file...');

			this.fs.copyTpl(
				this.templatePath('_config.xml'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/config.xml'),
				params
			);

			console.log('Generated config.xml file...');

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/index.html')
			);

			// template out admin controllers folder
			this.fs.copyTpl(
				this.templatePath('_admin_list_controller.php'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/controllers/' + params.views.standard.listview.lowercase + '.php'),
				params
			);

			console.log('Generatedd list view controller.php file...');

			this.fs.copyTpl(
				this.templatePath('_admin_edit_controller.php'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/controllers/' + params.views.standard.detailview.lowercase + '.php'),
				params
			);

			console.log('Generated detail view controller.php file...');

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/index.html')
			);

			// Template out admin helpers folder
			this.fs.copyTpl(
				this.templatePath('_admin_helper.php'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/helpers/' + params.component + '.php'),
				params
			);
			
			console.log('Generatedd helper.php file...');

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/helpers/index.html')
			);
			
			// Template out admin models and forms folder
			//this.fs.copyTpl(
				//this.templatePath('_admin_list_model.php'),
				//this.destinationPath('joomla/administrator/components/com_' + params.component + '/models/' + params.views.standard.listview.lowercase + '.php'),
				//params
			//);

			//console.log('Generated list view modal.php file...');

			this.fs.copyTpl(
				this.templatePath('_admin_edit_model.php'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/models/' + params.views.standard.detailview.lowercase + '.php'),
				params
			);

			console.log('Generated detail view modal.php file...');

			this.fs.copyTpl(
				this.templatePath('_form.xml'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/models/forms/' + params.views.standard.detailview.lowercase + '.xml'),
				params
			);
			
			console.log('Generated detail view form XML file...');

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/models/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/models/forms/index.html')
			);

			// Template out admin sql folder
			this.fs.copyTpl(
				this.templatePath('_install.mysql.utf8.sql'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/sql/install.mysql.utf8.sql'),
				params
			);
			
			console.log('Generated admin sql install file...');

			this.fs.copyTpl(
				this.templatePath('_uninstall.mysql.utf8.sql'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/sql/uninstall.mysql.utf8.sql'),
				params
			);
			
			console.log('Generated admin sql uninstall file...');
			
			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/sql/index.html')
			);
			
			// Template out admin tables folder
			//this.fs.copyTpl(
				//this.templatePath('_table.php'),
				//this.destinationPath('joomla/administrator/components/com_' + params.component + '/tables/' + params.views.standard.detailview.lowercase + '.php'),
				//params
			//);
			
			//console.log('Generated table PHP file...');

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/tables/index.html')
			);

			// Template out admin view folder
			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/views/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('_admin_list_view.php'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/views/' +  params.views.standard.listview.lowercase + '/view.html.php'),
				params
			);
			
			console.log('Generated admin list view PHP file...');

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/views/' +  params.views.standard.listview.lowercase + '/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('_admin_edit_view.php'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/view.html.php'),
				params
			);

			console.log('Generated admin detail view PHP file...');

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/views/' + params.views.standard.listview.lowercase + '/tmpl/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('_admin_list_default.php'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/views/' + params.views.standard.listview.lowercase + '/tmpl/default.php'),
				params
			);
			
			console.log('Generated admin list view default PHP file...');

			this.fs.copyTpl(
				this.templatePath('_admin_list_default_batch.php'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/views/' + params.views.standard.listview.lowercase + '/tmpl/default_batch.php'),
				params
			);

			console.log('Generated admin list view default batch PHP file...');

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/tmpl/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('_admin_edit.php'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/tmpl/edit.php'),
				params
			);

			console.log('Generated admin detail view edit PHP file...');
			
			this.fs.copyTpl(
				this.templatePath('_admin_edit_params.php'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/tmpl/edit_params.php'),
				params
			);
			
			console.log('Generated admin detail view edit params PHP file...');

			this.fs.copyTpl(
				this.templatePath('_admin_edit_metadata.php'),
				this.destinationPath('joomla/administrator/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/tmpl/edit_metadata.php'),
				params
			);
			
			console.log('Generated admin detail view edit metadata PHP file...');

			// Template admin language files
			if (params.languagefile === true && typeof params.languagecode !== "undefined")
			{

				this.fs.copyTpl(
					this.templatePath('_language.ini'),
					this.destinationPath('joomla/language/' + params.languagecode + '/' + params.languagecode + '.com_' + params.component + '.ini'),
					params
				);
				
				console.log('Done generating admin langauge file...');

				this.fs.copyTpl(
					this.templatePath('_language.sys.ini'),
					this.destinationPath('joomla/language/' + params.languagecode + '/' + params.languagecode + '.com_' + params.component + '.sys.ini'),
					params
				);

				console.log('Done generating admin system lanuage file...');
				
			}

		}
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
