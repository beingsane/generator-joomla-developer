'use-strict';

module.exports = function(grunt) {

	grunt.registerTask('grunt-git-commit', 'Testing custom multitask', function(branch) {
		var done = this.async();
		var exec = require('child_process').exec;

		exec('git commit --no-ff ' + branch, { cwd: grunt.config('repoPath') }, function (error, stdout, stderr) {
			if (error)
			{
				grunt.log.errorlns(error);
			}
			else
			{

			}
		});
	});

};
