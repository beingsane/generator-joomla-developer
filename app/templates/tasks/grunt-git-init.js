'use-strict';

module.exports = function(grunt) {

	function remoteCallBack()
	{

	}

	function initCallBack()
	{
		if (error)
		{
			grunt.log.errorlns(error);
			return false;
		}

		exec('git remote add origin ' + grunt.config.get('repositoryUrl'), { cwd: grunt.config('repoPath') }, remoteCallBack)
	}

	grunt.registerTask('grunt-git-init', 'Initialize new repository', function(origin, branch) {
		var done = this.async();

		var exec = require('child_process').exec;
		var origin = origin || 'origin';

		exec('git init', { cwd: grunt.config('repoPath') }, initCallBack);
	});

};
