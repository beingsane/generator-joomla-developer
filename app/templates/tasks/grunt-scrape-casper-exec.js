'use-strict'

module.exports = function(grunt) {

	grunt.registerTask('grunt-scrape-casper', 'Execute casper script to pull CSS and JS files.', function(alias) {
		var done = this.async();
		var exec = require('child_process').exec;

		var path = grunt.config.get('repoPath');
		var endpoints = grunt.config.get('endpoints');
		var link = grunt.config.get('webUrl') + alias;
		grunt.log.writeln('Scraping: ' + link);

		exec('casperjs scrape.js ' + link, { cwd: "./tasks" }, function (error, stdout, stderr) {
			if (error)
			{
				grunt.log.errorlns(error);
				return false;
			}
			else
			{
				grunt.log.writelns(stdout);
				var obj = JSON.parse(stdout);

				for (var i = 0; i < obj.js.length; i++)
				{
					obj.js[i] = path + obj.js[i];
				}

				var js = grunt.config.get('js');
				grunt.config.set('js', js.concat(obj.js));


				for (var i = 0; i < obj.css.length; i++)
				{
					obj.css[i] = path + obj.css[i];
				}

				var css = grunt.config.get('css');
				grunt.config.set('css', js.concat(obj.css));

				done();
			}

		});
	});

};