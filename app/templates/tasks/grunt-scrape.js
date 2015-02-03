'use-strict'

var exec = require('child_process').exec;
var base = require('js-base64').Base64;

module.exports = function(grunt) {

	var js = [], css = [], endpoints;

	function scrubCoreFiles(files)
	{
		var temp = [];

		for (var i = 0; i < files.length; i++)
		{
			if (files[i].indexOf('media/system/js') === -1 && files[i].indexOf('media/jui/js') === -1)
			{

				temp.push(files[i].replace(grunt.config.get('baseUrl'), '/'));
			}
		}

		return temp;
	}

	function encode(link, symbols)
	{
		for (var i = 0; i < symbols.length; i++)
		{
			while (link.indexOf(symbols[i]) > -1)
			{
				link = link.replace(symbols[i], '\\' + symbols[i]);
			}
		}
		return link;
	}

	function executeCasper(alias, done, last)
	{
		var baseUrl = grunt.config.get('baseUrl');
		var link = baseUrl + endpoints[alias];
		var isLast = last || false;
		var path = grunt.config.get('repoPath');
		grunt.log.writeln('URL: ' + link);
		console.log('Encode: ', base.encode(link));

		exec('casperjs scrape.js --url=' + base.encode(link) + ' --web-security=false', { cwd: grunt.config.get('gruntPath') + "/tasks" }, function (error, stdout, stderr) {
			if (error)
			{
				grunt.log.errorlns('Child Process Exec Error');
				grunt.log.errorlns(error);
				done(false);
			}
			else
			{
				var obj = JSON.parse(stdout);

				for (var i = 0; i < obj.js.length; i++)
				{
					var clean = obj.js[i].replace(baseUrl, '/');
					if (clean.indexOf('/') !== 0)
					{
						clean = '/' + clean;
					}
					obj.js[i] = path + clean;
				}

				js = js.concat(obj.js);

				var newJs = {};
				newJs['build/' + alias + '.min.js'] = obj.js

				var tempJs = grunt.config.get('uglify.media.files');
				grunt.log.writeln(alias + ' JS Unique');
				console.log(newJs);
				grunt.log.writeln('end...');
				tempJs.push(newJs);
				grunt.log.writeln(alias + ' JS Endpoints');
				console.log(tempJs);
				grunt.log.writeln('end...');
				grunt.config.set('uglify.media.files', tempJs);

				for (i = 0; i < obj.css.length; i++)
				{
					//obj.css[i] = path + obj.css[i].replace(grunt.config.get('baseUrl'), '');
					var clean = obj.css[i].replace(baseUrl, '/');
					if (clean.indexOf('/') !== 0)
					{
						clean = '/' + clean;
					}
					obj.css[i] = path + clean;
				}

				css = css.concat(obj.css);

				var newCss = {};
				newCss['build/' + alias + '.min.css'] = obj.css

				var tempCss = grunt.config.get('cssmin.media.files');
				grunt.log.writeln(alias + ' CSS Unique');
				console.log(newCss);
				grunt.log.writeln('end...');
				tempCss.push(newCss);
				grunt.log.writeln(alias + ' CSS Endpoints');
				console.log(tempCss);
				grunt.log.writeln('end...');
				grunt.config.set('cssmin.media.files', tempCss);

				if (last)
				{
					js = js.filter(function(item, index, inputArray) {
						return inputArray.indexOf(item) == index;
					});

					css = css.filter(function(item, index, inputArray) {
						return inputArray.indexOf(item) == index;
					});

					var uniqueJs = scrubCoreFiles(js);
					var uniqueCss = scrubCoreFiles(css);


					grunt.config.set('jshint.all', uniqueJs);
					grunt.config.set('csslint.lax.src', uniqueCss);

					//grunt.log.writeln("Scraped menu endponts CSS and JS files...");

					done();
				}

			}

		});

	}

	grunt.registerTask('grunt-scrape', 'test casper task', function() {
		var done = this.async();

		endpoints = grunt.config.get('endpoints');
		var baseUrl = grunt.config.get('webUrl');
		var total = Object.keys(endpoints).length;
		grunt.log.writeln('Grunt scrape has ' + total + ' endpoints to parse...');
		var count = 1;

		for (var alias in endpoints)
		{
			if (endpoints.hasOwnProperty(alias))
			{
				grunt.log.writeln('Parsing ' + count + ' of ' + total + ' URLS...');
				var isLast = (count === total) ? true : false;
				executeCasper(alias, done, isLast);
				count++;
			}
		}

	});

};