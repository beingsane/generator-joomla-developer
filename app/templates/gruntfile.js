'use strict';
/*global module*/
var pkgData = require('./package.json');

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: '<json:package.json>',

		uglify: {
			media: {
				files: grunt.file.readJSON('./joomla/media/com_jopt/json/grunt.javascript.json')
			}
		},

		cssmin: {
			media: {
				files: grunt.file.readJSON('./joomla/media/com_jopt/json/grunt.css.json')
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
		},

		'azure-blob-upload': {
			dist: {
				options: {
					serviceOptions: 'DefaultEndpointsProtocol=https;AccountName=arcblobdev;AccountKey=SzIUOsMlepkOpLhPyvHi+xyeHbGE/pcRzL+uokXW5/S6c/4BTX2Waa84qhbW4RY2KeGN+VyM3dvgyPcLxM1R7g==',
					container: 'cdn',
					containerOptions: {
						publicAccessLevel: "blob"
					},
					blobProperties: {
						cacheControl: "public, max-age=31556926"
					}
				},

				src: './joomla/media/com_jopt/cdn/home.gz.min.css',
				dest: ''
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-azure');

	grunt.registerTask('initialize', 'Initialize Stuff', function() {
		//var css = grunt.file.readJSON('./joomla/media/com_jopt/json/grunt.javascript.json');
		//console.log(css);
		//var js = grunt.file.readJSON('./joomla/media/com_jopt/json/grunt.css.json');
		//console.log(js);
	});

	grunt.registerTask('default', ['initialize', 'uglify', 'cssmin', 'compress', 'azure-blob-upload']);};
