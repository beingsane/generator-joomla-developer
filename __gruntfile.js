'use strict'

module.exports = function(grunt) {

	grunt.initConfig({
		db_import: {
			options: {

			},
			"local": {
				"options": {
					"title": "Local DB",
					"database": grunt.config.get('db_database'),
					"user": grunt.config.get('db_user'),
					"pass": grunt.config.get('db_password'),
					"host": grunt.config.get('db_host'),
					"backup_to": "./database/joomla.sql"
				}
			}
		},

		rename: {
			move: {
				src: './' + grunt.config.get('repositoryName') + '/installation/',
				dest: './database/'
			}
		},

		open: {
			main: {
				path: grunt.config.get('url')
			}
		}
	});

	grunt.loadNpmTasks('grunt');
	grunt.loadNpmTasks('grunt-mysql-dump-import');
	grunt.loadNpmTasks('grunt-rename');
	grunt.loadNpmTasks('grunt-open');

	grunt.registerTask('dump', 'Utility to dump variables for troubleshooting purposes.', function() {
		grunt.log.writeln('yeoman root');
	});
	
	grunt.registerTask('install', ['db_import', 'rename', 'open', 'dump']);
	grunt.registerTask('default', ['open']);
}