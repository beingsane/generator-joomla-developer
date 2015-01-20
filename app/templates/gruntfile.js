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
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('initialize', 'Initialize Stuff', function() {
		//var css = grunt.file.readJSON('./joomla/media/com_jopt/json/grunt.javascript.json');
		//console.log(css);
		//var js = grunt.file.readJSON('./joomla/media/com_jopt/json/grunt.css.json');
		//console.log(js);
	});

	grunt.registerTask('default', ['initialize', 'uglify', 'cssmin', 'compress']);
};
