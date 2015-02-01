'use-strict'

module.exports = function(grunt) {
	grunt.registerTask('joomla-endpoints', 'Testing custom multitask', function() {
		var done = this.async();

		var mysql = require('mysql');
		var db = mysql.createConnection(grunt.config.get('database'));

		db.connect();

		db.query('SELECT alias, link FROM `jos_menu` WHERE published=1 AND menutype!="menu" AND alias!="root"', function(err, rows, fields) {
			if (err)
			{
				throw err;
			}
			var results = {};

			for (var i = 0; i < rows.length; i ++)
			{
				results[rows[i].alias] = rows[i].link;
			}

			grunt.config.set('endpoints', results);
			grunt.log.writeln('Found ' + i + ' menu endpoints to process.');

			done();
		});

	});
};