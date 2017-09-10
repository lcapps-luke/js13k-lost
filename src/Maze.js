AFRAME.registerComponent("maze", {
	schema: {
		maze: {type: "string"},
		size: {type: "vec3"},
	},
	
	init: function(){
		var maze = LevelDef.maze[this.data.maze];
		this.build(maze);
		
		this.el.sceneEl.emit("mazeLoaded");
	},
	
	build: function(maze){
		console.log(maze);
        
		for(var i in maze.floor){
			this.buildFloor(maze.floor[i], maze.width, maze.height);
		}
		
		for(var i in maze.solid){
			this.buildSolid(maze.solid[i], maze.width, maze.height);
		}
		
		for(var i in maze.nav){
			this.buildNav(maze.nav[i], maze.width, maze.height);
		}
        
        for(var i in maze.door){
            this.buildDoor(maze.door[i], maze.width, maze.height);
        }
        
        for(var i in maze.switch){
            this.buildSwitch(maze.switch[i], maze.width, maze.height);
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
				color: "#777",
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
				color: "#aaa",
				shadow: "",
				class: "solid"
			}
		};
		
		this.el.appendChild(SceneBuilder.buildElement(d));
	},
	
	buildNav: function(def, mazeW, mazeH){
		var x = (def.x / mazeW) * this.data.size.x;
		var z = (def.y / mazeH) * this.data.size.y;
		
		var d = {
			template: "navNode",
			attr: {
				position: x + " 2 " + z
			}
		};
		
		this.el.appendChild(SceneBuilder.buildElement(d));
	},
    
    buildDoor: function(def, mazeW, mazeH){
        var w = (def.width / mazeW) * this.data.size.x;
		var h = (def.height / mazeH) * this.data.size.y;
		var x = (def.x / mazeW) * this.data.size.x + w / 2;
		var y = (def.y / mazeH) * this.data.size.y + h / 2;
		var z = this.data.size.z / 2;
        
        var tx = x + (def.openPos.x / mazeW) * this.data.size.x;
        var ty = y + (def.openPos.y / mazeH) * this.data.size.y;
		
		var d = {
			type: "a-box",
			attr: {
				position: x + " " + z + " " + y,
				width: w,
				height: this.data.size.z,
				depth: h,
				color: "#ccc",
				shadow: "",
				class: "solid",
                id: def.name
			},
            children: [
                {
                    type: "a-animation",
                    attr: {
                        begin: "open",
                        attribute: "position",
                        from: x + " " + z + " " + y,
                        to: tx + " 0 " + ty,
                        duration: 1500,
                        easing: "ease-in",
                        fill: "forwards"
                    }
                }
            ]
		};
        
		this.el.appendChild(SceneBuilder.buildElement(d));
    },
    
    buildSwitch: function(def, mazeW, mazeH){
        var x = (def.x / mazeW) * this.data.size.x;
		var z = (def.y / mazeH) * this.data.size.y;
        var type = def.type;
        var target = def.type == "global" ? "a-scene" : "#" + def.target;
        var event = def.type == "door" ? "open" : "setVariable";
        var data = def.type == "global" ? "; data: " + def.target + ", true" : "";
		
		var d = {
			type: "a-entity",
            attr: {
                position: x + " 0.5 " + z,
                shadow: ""
            },
            children: [
                {
                    type: "a-box",
                    attr: {
                        width: 0.5,
                        height: 1,
                        depth: 0.5,
                        color: "#aaa"
                    }
                },
                {
                    type: "a-sphere",
                    attr: {
                        position: "0 0.5 0",
                        radius: 0.2,
                        color: "#f00",
                        switch: "target: " + target + "; event: " + event + data,
                        class: "clickable",
				        lostsound: "snd:click; on: click"
                    }
                }
            ]
		};
		console.log(d);
		this.el.appendChild(SceneBuilder.buildElement(d));
    }
	
});