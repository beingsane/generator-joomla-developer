'use-strict'

var exec = require('child_process').exec;
var js = [], css = [], uniqueJs = [], uniqueCss = [];

module.exports = function(grunt) {

	function executeCasper(alias, done, last)
	{
		var link = grunt.config('baseUrl') + 'alias';
		var isLast = last || false;
		var path = grunt.config('repoPath');

		exec('casperjs scrape.js ' + link, { cwd: "./tasks" }, function (error, stdout, stderr) {
			if (error)
			{
				grunt.log.errorlns(error);
				done(false);
			}
			else
			{
				console.log(alias + ': ', stdout);
				var obj = JSON.parse(stdout);

				for (var i = 0; i < obj.js.length; i++)
				{
					obj.js[i] = path + obj.js[i];
				}

				js = js.concat(obj.js);

				var newJs = {};
				newJs['build/' + alias + '.min.js'] = obj.js

				var tempJs = grunt.config.get('uglify.media.files');
				tempJs.push(newJs);
				grunt.config.set('uglify.media.files', tempJs);

				for (var i = 0; i < obj.css.length; i++)
				{
					obj.css[i] = path + obj.css[i];
				}

				css = css.concat(obj.css);

				var newCss = {};
				newCss['build/' + alias + '.min.css'] = obj.css

				var tempCss = grunt.config.get('cssmin.media.files');
				tempCss.push(newCss);
				grunt.config.set('cssmin.media.files', tempCss);

				if (last)
				{
					js = js.filter(function(item, index, inputArray) {
						return inputArray.indexOf(item) == index;
					});

					css = css.filter(function(item, index, inputArray) {
						return inputArray.indexOf(item) == index;
					});

					grunt.config.set('jshint.all', js);
					grunt.config.set('csslint.lax.src', css);

					grunt.log.writeln("Scraped menu endponts CSS and JS files...");

					done();
				}

			}

		});

	}

	grunt.registerTask('grunt-scrape', 'test casper task', function() {
		var done = this.async();
		var endpoints = grunt.config.get('endpoints');
		var baseUrl = grunt.config.get('webUrl');
		var total = Object.keys(endpoints).length;
		var count = 1;

		for (var alias in endpoints)
		{
			if (endpoints.hasOwnProperty(alias))
			{
				var isLast = (count === total) ? true : false;

				executeCasper(alias, done, isLast);
				count++;
			}
		}

	});

};