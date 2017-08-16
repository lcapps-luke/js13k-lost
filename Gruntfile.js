module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		uglify: {
			build: {
				files: {
					"bin/main.min.js": ["gen/*.js", "src/*.js"]
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
		},
		zip: {
			build: {
				cwd: "build/",
				src: ["build/index.html"],
				dest: "build/lost.zip",
				compression: 'DEFLATE'
			}
		}
	});
	
	grunt.loadTasks("tasks");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-minify-html");
	grunt.loadNpmTasks("grunt-replace");
	grunt.loadNpmTasks("grunt-zip");
	
	grunt.registerTask("build", ["levelGen", "uglify", "minifyHtml", "replace"]);
	grunt.registerTask("package", ["zip"]);
	grunt.registerTask("default", ["build", "package"]);
};