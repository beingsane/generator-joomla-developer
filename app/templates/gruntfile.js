'use strict';
/*global module*/
var pkgData = require('./package.json');

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: '<json:package.json>',

		endpoints: [],

		baseUrl: null,

		repoPath: null,

		database: {
			host: '',
			user: '',
			password: '',
			database: ''
		},

		jshint: {
			all: [],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				nonew: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: false,
				eqnull: true,
				node: true,
				strict: false,
				boss: false,
				browser: true,
				globals: {
					jQuery: true
				}
			}
		},

		csslint: {
			lax: {
				options: {
					import: false
				},
				src: []
			}
		},

		uglify: {
			media: {
				files: []
			}
		},

		cssmin: {
			media: {
				files: []
			}
		},

		compress: {
			media: {
				options: {
					mode: 'gzip'
				},
				files: [
					{
						expand: true,
						src: ['build/*.min.js'],
						dest: './',
						ext: '.min.js.gz'
					},
					{
						expand: true,
						src: ['build/*.min.css'],
						dest: './',
						ext: '.min.css.gz'
					}
				]
			}
		},

		clean: [
			'!build/index.html',
			'build/*js*',
			'build/*css*',
			grunt.config.get('repoPath') + '/media/plg_system_jopt/css/*css*',
			'!' + grunt.config.get('repoPath') + '/media/plg_system_jopt/css/index.html',
			grunt.config.get('repoPath') + '/media/plg_system_jopt/js/*js*',
			'!' + grunt.config.get('repoPath') + '/media/plg_system_jopt/js/index.html'
		],

		copy: {
			main: {
				files: [
					{
						expand: true,
						src: ['build/*.css'],
						dest: grunt.config.get('repoPath') + '/media/plg_system_jopt/css/'
					},
					{
						expand: true,
						src: ['build/*.css.gz'],
						dest: grunt.config.get('repoPath') + '/media/plg_system_jopt/css/'
					},
					{
						expand: true,
						src: ['build/*.js'],
						dest: grunt.config.get('repoPath') + '/media/plg_system_jopt/js/'
					},
					{
						expand: true,
						src: ['build/*.js.gz'],
						dest: grunt.config.get('repoPath') + '/media/plg_system_jopt/js/'
					}
				]
			}
		},

		'azure-blob-upload': {
			js: {
				options: {
					serviceOptions: 'DefaultEndpointsProtocol=https;AccountName=arcblobdev;AccountKey=SzIUOsMlepkOpLhPyvHi+xyeHbGE/pcRzL+uokXW5/S6c/4BTX2Waa84qhbW4RY2KeGN+VyM3dvgyPcLxM1R7g==',
					container: 'cdn',
					containerOptions: {
						publicAccessLevel: "blob"
					},
					blobProperties: {
						cacheControl: "public, max-age=31556926",
						contentEncoding: "gzip",
						contentType: "text/javascript"
					}

				},
				files:
				[
					{
						expand: true,
						cwd: './build/',
						src: '*.min.js.gz',
						dest: ''
					}
				]
			},
			css: {
				options: {
					serviceOptions: 'DefaultEndpointsProtocol=https;AccountName=arcblobdev;AccountKey=SzIUOsMlepkOpLhPyvHi+xyeHbGE/pcRzL+uokXW5/S6c/4BTX2Waa84qhbW4RY2KeGN+VyM3dvgyPcLxM1R7g==',
					container: 'cdn',
					containerOptions: {
						publicAccessLevel: "blob"
					},
					blobProperties: {
						cacheControl: "public, max-age=31556926",
						contentEncoding: "gzip",
						contentType: "text/css"
					}

				},
				files:
				[
					{
						expand: true,
						cwd: './build/',
						src: '*.min.css.gz',
						dest: ''
					}
				]
			}
		},

		mysqlrunfile: {
			options: {
				connection: {
					host: 'localhost',
					username: 'root',
					password: 'Q3q3N75EUNRpuLRV',
					database: grunt.option('database'),
					multipleStatements: true
				},
				src: grunt.option('source') + '/build/database/arcsupport.sql'
			}
		}

	});

	grunt.registerTask('git-init', 'Testing custom multitask', function() {
		var done = this.async();
		var cmd = require('cmd-exec').init();

		var project = grunt.option('repository');
		var branch = grunt.option('branch');

		grunt.log.writeln('Checking out branch ' + branch + ' for project ' + project + '.');

		var exec = require('child_process').exec;
		exec('git checkout ' + branch, { cwd: grunt.option('source') }, function (error, stdout, stderr) {
			if (error)
			{
				grunt.log.errorlns(error);
			}
			else
			{
				grunt.log.writeln(stdout);
			}
		});

		exec('git pull origin', { cwd: grunt.option('source') }, function (error, stdout, stderr) {
			if (error)
			{
				grunt.log.errorlns(error);
			}
			else
			{
				grunt.log.writeln(stdout);
			}

			done();

		});
	});

	grunt.registerTask('mysql-scripts', 'Run any import scripts for mysql', function() {
		var done = this.async();
		var cmd = require('cmd-exec').init();

		grunt.log.writeln('Importing SQL script into ' + grunt.option('database') + ' database.');

		var exec = require('child_process').exec;
		exec('mysql -u root --password=Q3q3N75EUNRpuLRV ' + grunt.option('database') + ' < ' + grunt.option('database') + '.sql', { cwd: grunt.option('source') + '/build/database' }, function (error, stdout, stderr) {
			if (error)
			{
				grunt.log.errorlns(error);
			}
			else
			{
				grunt.log.writeln(stdout);
			}

			done();
		});
	});

	grunt.registerTask('dump', 'Test Variables', function() {
		var js = grunt.config.get('jshint.all');
		var css = grunt.config.get('csslint.lax.src');

		grunt.log.writeln('JS Unique:');
		console.log(js);
		grunt.log.writeln('CSS Unique:');
		console.log(css);

		js = grunt.config.get('uglify.media.files');
		css = grunt.config.get('cssmin.media.files');

		grunt.log.writeln('JS Endpoint Files:');
		console.log(js);
		grunt.log.writeln('CSS Endpoint Files:');
		console.log(css);
	});

	grunt.registerTask('initialize', 'Set default values for build server credentials and directories', function() {
		var branch = grunt.option('branch') || 'master';
		grunt.option('branch', branch);
	});

	grunt.loadTasks('./tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-azure');
	grunt.loadNpmTasks('grunt-mysql-runfile');

	grunt.registerTask('scrub', ['clean'])
	grunt.registerTask('init', ['scrub', 'initialize', 'joomla-endpoints', 'grunt-scrape']);
	grunt.registerTask('test', ['init', 'jshint']); //,'csslint']);
	grunt.registerTask('build', ['test', 'uglify', 'cssmin', 'compress', 'copy', 'azure-blob-upload']);
	grunt.registerTask('default', ['build']);

};