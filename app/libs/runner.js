'use strict';

var Q = require('q'),
	_ = require('lodash'),
	fs = require('fs');

module.exports = function(grunt) {

	grunt.registerMultiTask('mysqlrunfile', 'Runs given sql files.', function() {

		var drivers = ['mysql'];
		var db = null;
		var done = this.async();
		var self = this;

		var options = this.options({
			connection: {
				host: 'localhost',
				user: '',
				password: '',
				database: '',
				multipleStatements: true
			}
		});

		grunt.verbose.writeln('Loading driver ' + 'mysql');
		db = require('./lib/mysql').init(grunt, options);

		db.connect()
		.then(function() {
			console.log('connection succeeded');

			var promise_chain = Q.fcall(function(){});

			grunt.log.subhead('Run:');

			self.filesSrc.forEach(function(file) {

				var promise_link = function() {
					var deferred = Q.defer();

					grunt.log.writeln(file);

					var content = fs.readFileSync(file, 'utf8');
					db.query(content).then(function() {
						deferred.resolve();
					});

					return deferred.promise;
				};

				// add the link onto the chain
				promise_chain = promise_chain.then(promise_link);
			});

			return promise_chain;
		})
		.then(function() {
			grunt.log.ok('Sql query files succeeded');
		})
		.catch(function() {
			grunt.log.error('Sql query files failed.');
		})
		.finally(function() {
			done();
		});

	});
};