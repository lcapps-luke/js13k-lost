var fs = require('fs');
var parseMaze = require("./../res/mazeParser.js");

module.exports = function(grunt) {
	grunt.registerTask('levelGen', function() {
		var done = this.async();
		
		var levelTemplate = require("./../res/levelTemplates.json");
		var mazeMap = {};
		var levelMap = {};
		
		fs.readdir("./res/maze", readMazeDir);
		
		function readMazeDir(err, files){
			if(err){
				throw err;
			}
			
			for(var i = 0; i < files.length; i++){
				var f = files[i];
				
				var mazeJson = require("./../res/maze/" + f);
				mazeMap[f] = parseMaze(mazeJson);
			}
			
			fs.readdir("./res/level", readLevelDir);
		}
		
		function readLevelDir(err, files){
			if(err){
				throw err;
			}
			
			for(var i = 0; i < files.length; i++){
				var f = files[i];
				
				var lvlJson = require("./../res/level/" + f);
				levelMap[f] = lvlJson;
			}
			
			var levelJson = {
				template: levelTemplate,
				maze: mazeMap,
				level: levelMap
			};
			
			var str = "var LevelDef = " + JSON.stringify(levelJson);
			
			fs.writeFile("./gen/levelDef.js", str, 'utf8', function (err) {
				if (err) {
					throw err;
				}

				done();
			}); 
		}
	});
}