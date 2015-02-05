'use strict';

/*global module*/
var pkgData = require('./package.json');

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: '<json:package.json>',

		endpoints: [],

		name: '<%= name %>',

		url: '<%= url %>',

		repository: {
			path: '<%= path %>',
			name: '<%= repositoryName %>',
			url: '<%= repositoryUrl %>'
		},

		database: {
			options: {
				host: '<%= db_host %>',
				user: '<%= db_user %>',
				password: '<%= db_password %>',
				database: '<%= db_database %>'
			},
			prefix: '<%= db_prefix %>'
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
			grunt.config.get('repository.path') + grunt.config.get('repository.name') + '/media/plg_system_jopt/css/*css*',
			'!' + grunt.config.get('repository.path') + grunt.config.get('repository.name') + '/media/plg_system_jopt/css/index.html',
			grunt.config.get('repository.path') + grunt.config.get('repository.name') + '/media/plg_system_jopt/js/*js*',
			'!' + grunt.config.get('repository.path') + grunt.config.get('repository.name') + '/media/plg_system_jopt/js/index.html'
		],

		copy: {
			main: {
				files: [
					{
						expand: true,
						src: ['build/*.css'],
						dest: grunt.config.get('repository.path') + grunt.config.get('repository.name') + '/media/plg_system_jopt/css/'
					},
					{
						expand: true,
						src: ['build/*.css.gz'],
						dest: grunt.config.get('repository.path') + grunt.config.get('repository.name') + '/media/plg_system_jopt/css/'
					},
					{
						expand: true,
						src: ['build/*.js'],
						dest: grunt.config.get('repository.path') + grunt.config.get('repository.name') + '/media/plg_system_jopt/js/'
					},
					{
						expand: true,
						src: ['build/*.js.gz'],
						dest: grunt.config.get('repository.path') + grunt.config.get('repository.name') + '/media/plg_system_jopt/js/'
					}
				]
			}
		},

		s3: {
			options: {
				key: 'AKIAICEQIBR7TLOUM6ZQ',
				secret: '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',
				bucket: 'bp-cdn-media',
				access: 'public-read',
				headers: {
					// Two Year cache policy (1000 * 60 * 60 * 24 * 730)
					"Content-Encoding": "gzip",
					"Cache-Control": "max-age=630720000, public",
					"Expires": new Date(Date.now() + 63072000000).toUTCString()
				}
			},
			js: {
				options: {
					headers: {
						"Content-Type": "text/javascript"
					}
				},
				upload:
				[
					{
						cwd: './build/',
						src: '*.min.js.gz',
						dest: 'js/'
					}
				]
			},
			css: {
				options: {
					headers: {
						"Content-Type": "text/css"
					}
				},
				upload:
				[
					{
						cwd: './build/',
						src: '*.min.css.gz',
						dest: 'css/'
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

		db_import: {
			options: {

			},
			"local": {
				"options": {
					"title": "Local DB",
					"database": grunt.config.get(database.database),
					"user": grunt.config.get(database.user),
					"pass": grunt.config.get(database.password),
					"host": grunt.config.get(database.host),
					"backup_to": "./database/joomla.sql"
				}
			}
		},

		rename: {
			move: {
				src: grunt.config.get('repository.path') + grunt.config.get('repository.name') + '/installation/',
				dest: grunt.config.get('repository.path') + '/database/installation/'
			}
		},

		open: {
			main: {
				path: grunt.config.get('url')
			}
		}

	});

	grunt.registerTask('dump', 'Utility to dump variables for troubleshooting purposes.', function() {
		var endpoints = grunt.config.get('endpoints');
		grunt.log.writeln('Endpoints:');
		//grunt.log.writeln(endpoints);
		console.log(endpoints);
		var js = grunt.config.get('jshint.all');
		var css = grunt.config.get('csslint.lax.src');

		grunt.log.writeln('JS Unique:');
		grunt.log.writeln(js);
		grunt.log.writeln('CSS Unique:');
		grunt.log.writeln(css);

		js = grunt.config.get('uglify.media.files');
		css = grunt.config.get('cssmin.media.files');

		grunt.log.writeln('JS Endpoint Files:');
		//grunt.log.writeln(js);
		console.log(js);
		grunt.log.writeln('CSS Endpoint Files:');
		//grunt.log.writeln(css);
		console.log(js);
	});

	grunt.registerTask('initialize', 'Set default values for build server credentials and directories', function() {
		var branch = grunt.option('branch') || 'master';
		grunt.option('branch', branch);
		grunt.log.writeln('Operating in ' + branch + ' branch...');
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
	grunt.loadNpmTasks('grunt-s3');
	grunt.loadNpmTasks('grunt-mysql-dump-import');
	grunt.loadNpmTasks('grunt-rename');
	grunt.loadNpmTasks('grunt-open');

	grunt.registerTask('finalize', ['db_import', 'rename', 'open']);

	grunt.registerTask('scrub', ['clean']);
	grunt.registerTask('endpoints', ['initialize', 'joomla-endpoints']);
	grunt.registerTask('init', ['endpoints', 'grunt-scrape']);
	grunt.registerTask('aws', ['s3']);
	//grunt.registerTask('test', ['init', 'jshint','csslint']);
	grunt.registerTask('test', ['init']);
	//grunt.registerTask('build', ['test', 'uglify', 'cssmin', 'compress', 'copy']);
	grunt.registerTask('build', ['test', 'scrub', 'uglify', 'cssmin', 'compress', 'copy', 'azure-blob-upload']);
	//grunt.registerTask('build', ['test', 'uglify', 'cssmin', 'compress', 'copy', 'aws']);
	grunt.registerTask('default', ['build']);

};