'use strict';
/*global module*/
var pkgData = require('./package.json');

var mysql = require('');

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: '<json:package.json>',

		uglify: {
			media: [{
				files: {
					'./joomla/media/com_jopt/cdn/home.min.js' :
					[
						'./joomla/media/jui/js/jquery-noconflict.js',
						'./joomla/media/jui/js/jquery-migrate.js',
						'./joomla/media/system/js/caption.js',
						'./joomla/media/jui/js/bootstrap.js',
						'./joomla/templates/protostar/js/template.js'
					]
				}
			}]

		},

		cssmin: {
			media: {
				files: {
					'./joomla/media/com_jopt/cdn/home.min.css': ['./joomla/templates/protostar/css/template.css', './joomla/media/mod_languages/css/template.css']
				}
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
						src: ['./joomla/media/com_jopt/cdn/*.min.js'],
						dest: './',
						ext: '.gz.min.js'
					},
					{
						expand: true,
						src: ['./joomla/media/com_jopt/cdn/*.min.css'],
						dest: './',
						ext: '.gz.min.css'
					}
				]
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('media', ['uglify', 'cssmin', 'compress']);
	grunt.registerTask('default', ['cssmin']);
};
