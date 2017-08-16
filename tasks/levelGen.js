var fs = require('fs');

module.exports = function(grunt) {
	grunt.registerTask('levelGen', function() {
		var done = this.async();
		
		var levelTemplate = require("./../res/levelTemplates.json");
		var levelMap = {};
		
		fs.readdir("./res/level", function(err, files){
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
				level: levelMap
			};
			
			var str = "var LevelDef = " + JSON.stringify(levelJson);
			
			fs.writeFile("./gen/levelDef.js", str, 'utf8', function (err) {
				if (err) {
					throw err;
				}

				done();
			}); 
		});
		
	});
}