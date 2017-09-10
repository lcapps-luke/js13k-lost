module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
        profile: {
            default: "release",
            profiles: ["test", "release"]
        },
		uglify: {
			build: {
				files: {
					"bin/main.min.js": ["node_modules/jsfxr/jsfxr.js", "gen/*.js", "src/*.js"]
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
						},
                        {
                            match: "aframe",
                            test: {
                                replacement: "aframe.min.js"
                            },
                            release:{
                                replacement: "https://aframe.io/releases/0.6.1/aframe.min.js"
                            }
                        }
					]
				},
				files: [
					{
						expand: true,
						flatten: true,
						dest: "build/",
                        
                        test: {
                            src: ["bin/index.html", "external/aframe.min.js"],
                        },
                        release:{
                            src: ["bin/index.html"]
                        }
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
    grunt.loadNpmTasks('grunt-profile');
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-minify-html");
	grunt.loadNpmTasks("grunt-replace");
	grunt.loadNpmTasks("grunt-zip");
	
    grunt.registerTask("default", ["build", "package"]);
    grunt.registerTask("localBuild", ["profile:test", "build", "package"]);
	grunt.registerTask("build", ["levelGen", "uglify", "minifyHtml", "replace"]);
	grunt.registerTask("package", ["zip"]);
    
	
};