module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		uglify: {
			build: {
				files: {
					"bin/main.min.js": ["src/*.js"]
				}
			}
		},
		minifyHtml: {
			build: {
				files: {
					"bin/index.html": "res/index.html"
				}
			}
		},
		replace: {
			build: {
				options: {
					patterns: [
						{
							match: "include",
							replacement: "<%= grunt.file.read('bin/main.min.js') %>"
						}
					]
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: ["bin/index.html"],
						dest: "build/"
					}
				]
			}
		}
	});
	
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-minify-html");
	grunt.loadNpmTasks("grunt-replace");
	
	grunt.registerTask("default", ["uglify", "minifyHtml", "replace"]);
};