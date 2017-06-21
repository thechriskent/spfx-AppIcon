'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

const path = require('path');
const fs = require('fs');

//When the --bundleicon parameter is used, copies the App Icon image file (when specified) to the dist folder
let appIconToBundle = build.subTask('app-icon-to-bundle', function(gulp, buildOptions, done) {
	//Look for the --bundleicon parameter
	var bundleIcon = (process.argv.indexOf('--bundleicon') !== -1);
	
	if(bundleIcon){
		//Get the config file path
		var psConfigPath = path.join(process.cwd(), 'config', "package-solution.json");

		//read the config file into a JSON object
		var psConfig = undefined;
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
