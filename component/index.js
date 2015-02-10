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
					rootPath: this.config.get('repositoryName') || 'joomla-cms',
					updateserver: false,
					icon: false,
					media: {
						css: true,
						js: true,
						images: true
					},
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
							tags: true,
							versions: true
						}
					},
					views: {
						bare: false,
						standard: {
							listview: {
								camelcase: 'Auctions',
								lowercase: 'auctions',
								uppercase: 'AUCTIONS'
							},
							detailview:{
								camelcase: 'Auction',
								lowercase: 'auction',
								uppercase: 'AUCTION'
							},
						}
					}
				};

			var components = this.config.get('components');
			components.push(params);
			this.config.set('components', components);

			// Generate Admin component files
			this.fs.copyTpl(
				this.templatePath('_manifest.xml'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/' + params.component + '.xml'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_admin_component.php'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/' + params.component + '.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_admin_controller.php'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/controller.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_access.xml'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/access.xml'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_config.xml'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/config.xml'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('_admin_list_controller.php'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/controllers/' + params.views.standard.listview.lowercase + '.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_admin_edit_controller.php'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/controllers/' + params.views.standard.detailview.lowercase + '.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('_admin_helper.php'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/helpers/' + params.component + '.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/helpers/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('_admin_list_model.php'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/models/' + params.views.standard.listview.lowercase + '.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_admin_edit_model.php'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/models/' + params.views.standard.detailview.lowercase + '.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_form.xml'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/models/forms/' + params.views.standard.detailview.lowercase + '.xml'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/models/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/models/forms/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('_install.mysql.utf8.sql'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/sql/install.mysql.utf8.sql'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_uninstall.mysql.utf8.sql'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/sql/uninstall.mysql.utf8.sql'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/sql/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('_table.php'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/tables/' + params.views.standard.detailview.lowercase + '.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/tables/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/views/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('_admin_list_view.php'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/views/' +  params.views.standard.listview.lowercase + '/view.html.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/views/' +  params.views.standard.listview.lowercase + '/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('_admin_edit_view.php'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/view.html.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/views/' + params.views.standard.listview.lowercase + '/tmpl/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('_admin_list_default.php'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/views/' + params.views.standard.listview.lowercase + '/tmpl/default.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_admin_list_default_batch.php'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/views/' + params.views.standard.listview.lowercase + '/tmpl/default_batch.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/tmpl/index.html')
			);

			this.fs.copyTpl(
				this.templatePath('_admin_edit.php'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/tmpl/edit.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_admin_edit_params.php'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/tmpl/edit_params.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_admin_edit_metadata.php'),
				this.destinationPath(params.rootPath + '/administrator/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/tmpl/edit_metadata.php'),
				params
			);

			// Template admin language files
			if (params.languagefile === true && typeof params.languagecode !== "undefined")
			{

				this.fs.copyTpl(
					this.templatePath('_admin_language.ini'),
					this.destinationPath(params.rootPath + '/administrator/language/' + params.languagecode + '/' + params.languagecode + '.com_' + params.component + '.ini'),
					params
				);


				this.fs.copyTpl(
					this.templatePath('_admin_language.sys.ini'),
					this.destinationPath(params.rootPath + '/administrator/language/' + params.languagecode + '/' + params.languagecode + '.com_' + params.component + '.sys.ini'),
					params
				);

			}

			// Generate Site component files

			console.log('GENERATING SITE FILES');
			console.log(params.rootPath);
			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/components/com_' + params.component + '/index.html')
			);
			console.log('generated 1 of 7 index.html file...');
			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/components/com_' + params.component + '/controllers/index.html')
			);
			console.log('generated 2 of 7 index.html file...');
			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/components/com_' + params.component + '/models/index.html')
			);
			console.log('generated 3 of 7 index.html file...');
			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/components/com_' + params.component + '/models/forms/index.html')
			);
			console.log('generated 4 of 7 index.html file...');
			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/index.html')
			);
			console.log('generated 5 of 7 index.html file...');
			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/index.html')
			);
			console.log('generated 6 of 7 index.html file...');
			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath(params.rootPath + '/components/com_' + params.component + '/index.html')
			);
			console.log('generated 7 of 7 index.html file...');
			this.fs.copyTpl(
				this.templatePath('_site_controller_detailview.php'),
				this.destinationPath(params.rootPath + '/components/com_' + params.component + '/controllers/' + params.views.standard.detailview.lowercase + '.php'),
				params
			);
			console.log('detail view controller');

			this.fs.copyTpl(
				this.templatePath('_site_model_detailview.php'),
				this.destinationPath(params.rootPath + '/components/com_' + params.component + '/models/' + params.views.standard.detailview.lowercase + '.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_site_form_detailview.xml'),
				this.destinationPath(params.rootPath + '/components/com_' + params.component + '/models/forms/' + params.views.standard.detailview.lowercase + '.xml'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_site_view_detailview.php'),
				this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/view.html.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_site_view_detailview_edit.php'),
				this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/tmpl/edit.php'),
				params
			);
			
			this.fs.copyTpl(
				this.templatePath('_site_view_detailview_default.php'),
				this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/tmpl/default.php'),
				params
			);

			this.fs.copyTpl(
				this.templatePath('_site_view_detailview_default.xml'),
				this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/' + params.views.standard.detailview.lowercase + '/tmpl/default.xml'),
				params
			);

			if (params.languagefile === true && typeof params.languagecode !== "undefined")
			{
				this.fs.copyTpl(
					this.templatePath('_site_language.ini'),
					this.destinationPath(params.rootPath + '/language/' + params.languagecode + '/' + params.languagecode + '.com_' + params.component + '.ini'),
					params
				);
			}

			if (params.db.fields.categories)
			{
				this.fs.copyTpl(
					this.templatePath('_site_model_categories.php'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/models/categories.php'),
					params
				);

				this.fs.copyTpl(
					this.templatePath('_site_model_category.php'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/models/category.php'),
					params
				);

				this.fs.copyTpl(
					this.templatePath('index.html'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/categories/index.html')
				);

				this.fs.copyTpl(
					this.templatePath('index.html'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/category/index.html')
				);

				this.fs.copyTpl(
					this.templatePath('index.html'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/categories/tmpl/index.html')
				);

				this.fs.copyTpl(
					this.templatePath('index.html'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/category/tmpl/index.html')
				);

				this.fs.copyTpl(
					this.templatePath('_site_view_categories.php'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/categories/view.html.php'),
					params
				);

				this.fs.copyTpl(
					this.templatePath('_site_view_category.php'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/category/view.html.php'),
					params
				);

				this.fs.copyTpl(
					this.templatePath('_site_view_category_feed.php'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/category/view.feed.php'),
					params
				);

				this.fs.copyTpl(
					this.templatePath('_site_view_categories_default.php'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/categories/tmpl/default.php'),
					params
				);

				this.fs.copyTpl(
					this.templatePath('_site_view_categories_default_items.php'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/categories/tmpl/default_items.php'),
					params
				);

				this.fs.copyTpl(
					this.templatePath('_site_view_categories_default.xml'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/categories/tmpl/default.xml'),
					params
				);

				this.fs.copyTpl(
					this.templatePath('_site_view_category.php'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/category/view.html.php'),
					params
				);

				this.fs.copyTpl(
					this.templatePath('_site_view_category_default.php'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/category/tmpl/default.php'),
					params
				);

				this.fs.copyTpl(
					this.templatePath('_site_view_category_default_items.php'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/category/tmpl/default_items.php'),
					params
				);

				this.fs.copyTpl(
					this.templatePath('_site_view_category_default_children.php'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/category/tmpl/default_children.php'),
					params
				);

				this.fs.copyTpl(
					this.templatePath('_site_view_category_default.xml'),
					this.destinationPath(params.rootPath + '/components/com_' + params.component + '/views/category/tmpl/default.xml'),
					params
				);
			}
			// End site component files

			// Generate Media component files
			if (params.media)
			{

				this.fs.copyTpl(
					this.templatePath('index.html'),
					this.destinationPath(params.rootPath + '/media/com_' + params.component + '/index.html')
				);

				if (params.media.css)
				{
					this.fs.copyTpl(
						this.templatePath('index.html'),
						this.destinationPath(params.rootPath + '/media/com_' + params.component + '/css/index.html')
					);
				}

				if (params.media.js)
				{
					this.fs.copyTpl(
						this.templatePath('index.html'),
						this.destinationPath(params.rootPath + '/media/com_' + params.component + '/js/index.html')
					);
				}

				if (params.media.images)
				{
					this.fs.copyTpl(
						this.templatePath('index.html'),
						this.destinationPath(params.rootPath + '/media/com_' + params.component + '/images/index.html')
					);
				}
			}

		}
	},

	install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
