'use strict'

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.initConfig({
		db_import: {
			options: {

			},
			"local": {
				"options": {
					"title": "Local DB",
					"database": grunt.config.get(db_database),
					"user": grunt.config.get(db_user),
					"pass": grunt.config.get(db_password),
					"host": grunt.config.get(db_host),
					"backup_to": "./database/joomla.sql"
				}
			}
		},

		rename: {
			move: {
				src: grunt.config.get('path') + '/' + grunt.config.get('repositoryName') + '/installation/',
				dest: grunt.config.get('path') + '/database/installation/'
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

	grunt.registerTask('install', ['db_import', 'rename', 'open']);
	grunt.registerTask('default', ['open']);
}