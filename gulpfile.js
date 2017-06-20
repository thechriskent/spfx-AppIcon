'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

let appIconToBundle = build.subTask('app-icon-to-bundle', function(gulp, buildOptions, done) {
	//Look for the --bundleicon parameter
	var bundleIcon = (process.argv.indexOf('--bundleicon') !== -1);
	
	if(bundleIcon){
		//Get config file path
		var path = require('path');
		var psConfigPath = path.join(process.cwd(), 'config', "package-solution.json");

		//read config file into JSON object
		var psConfig = undefined;
        var fs = require('fs');
        try {
            var content = fs.readFileSync(psConfigPath, 'utf8');
            psConfig = JSON.parse(content);
        }
        catch (e) { }

		//Verify an iconPath has been provided
        if(psConfig && psConfig.solution && psConfig.solution.iconPath){
			//Copy the icon to the assets destination
			gulp.src('./sharepoint/' + psConfig.solution.iconPath)
				.pipe(gulp.dest('./dist'));
		}
	}
	
	done();
});

build.rig.addPostBuildTask(appIconToBundle);

build.initialize(gulp);
