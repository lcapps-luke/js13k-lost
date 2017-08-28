AFRAME.registerComponent("maze", {
	schema: {
		maze: {type: "string"},
		size: {type: "vec3"},
	},
	
	init: function(){
		var maze = LevelDef.maze[this.data.maze];
		this.build(maze);
	},
	
	build: function(maze){
		console.log(maze);
		for(var i in maze.floor){
			this.buildFloor(maze.floor[i], maze.width, maze.height);
		}
		
		for(var i in maze.solid){
			this.buildSolid(maze.solid[i], maze.width, maze.height);
		}
	},
	
	buildFloor: function(def, mazeW, mazeH){
		var w = (def.width / mazeW) * this.data.size.x;
		var h = (def.height / mazeH) * this.data.size.y;
		var x = (def.x / mazeW) * this.data.size.x + w / 2;
		var y = (def.y / mazeH) * this.data.size.y + h / 2;
		
		var d = {
			type: "a-plane",
			attr: {
				rotation: "-90 0 0",
				position: x + " 0 " + y,
				width: w,
				height: h,
				color: "#009b00",
				shadow: ""
			}
		};
		
		this.el.appendChild(SceneBuilder.buildElement(d));
	},
	
	buildSolid: function(def, mazeW, mazeH){
		var w = (def.width / mazeW) * this.data.size.x;
		var h = (def.height / mazeH) * this.data.size.y;
		var x = (def.x / mazeW) * this.data.size.x + w / 2;
		var y = (def.y / mazeH) * this.data.size.y + h / 2;
		var z = this.data.size.z / 2;
		
		var d = {
			type: "a-box",
			attr: {
				position: x + " " + z + " " + y,
				width: w,
				height: this.data.size.z,
				depth: h,
				color: "#009b00",
				shadow: ""
			}
		};
		var ele = SceneBuilder.buildElement(d);
		this.el.appendChild(ele);
		console.log(ele);
	}
	
});