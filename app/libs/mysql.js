'use strict';

var Q = require('q'),
	fs = require('fs'),
	_ = require('lodash'),
	mysql = require('mysql');

exports.init = function(options)
{
	var exports = {},
		connection;

	exports.connect = function() {
		var deferred = Q.defer();

		connection = mysql.createConnection(options.connection);

		connection.connect(function(err) {
			if (err) {
				
				// NEED TO REPLACE
				//grunt.fatal('Unable to connect to database server: ', err);

				deferred.reject();
				return;
			}

			deferred.resolve();
		});

		return deferred.promise;
	};

	exports.query = function(content) {
		var deferred = Q.defer();

		connection.query(content, function(err) {
			if(err) {
				// NEED TO REPLACE
				//grunt.fatal(err.message);
				deferred.reject();
				return;
			}

			deferred.resolve();
		});

		return deferred.promise;
	};

	return exports;
};