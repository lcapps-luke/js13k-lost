AFRAME.registerComponent("lost", {
	init: function () {
		this.clickableList = [];
		window.lostVars = {
			leftDone: false,
			rightDone: false
		};
		
		this.mazeCount = 0;
		this.mazeLoaded = 0;
		
		var _this = this;
		this.el.addEventListener("changeLevel", function(e){_this.loadScene(e.detail.level, e.detail.position)});
		this.el.addEventListener("setVariable", function(e){_this.onSetVariable(e.detail[0], e.detail[1])});
		this.el.addEventListener("mazeLoaded", function(e){_this.onMazeLoaded()});
		
		this.player = this.el.sceneEl.querySelector("#player");
		this.player.addEventListener("move", function(pos){_this.onPlayerMove(pos.detail)});
		
		this.loadScene("hub.json");
	},
	
	tick: function(time, delta){
		
	},
	
	loadScene: function(sceneName, position){
		var scene = this.el;
		this.mazeLoaded = 0;
		
		//cleanup scene
		var old = scene.querySelectorAll("a-scene>.vr:not(.global)");
		for(var i = 0; i < old.length; i++){
			scene.removeChild(old[i]);
		}
		
		//read scene json
		var sceneJson = LevelDef.level[sceneName];
        
        var pos = position ? position : sceneJson.player;
		this.player.setAttribute("position", pos);
        
		SceneBuilder.buildChildren(scene, sceneJson.objects);

		var maze = scene.querySelectorAll("[maze]");
		this.mazeCount = maze.length;
		
		if(this.mazeCount == 0){
			this.clickableList = scene.querySelectorAll(".clickable"); //TODO wait for clickable's position attributes to load
			this.onPlayerMove(pos);
			scene.emit("loaded");
		}
	},
	
	onMazeLoaded: function(){
		this.mazeLoaded++;
		if(this.mazeCount == this.mazeLoaded){
			this.clickableList = this.el.querySelectorAll(".clickable"); //TODO wait for clickable's position attributes to load
			console.log(this.clickableList);
			var pos = this.player.getAttribute("position");
			this.onPlayerMove(pos);
			this.el.emit("loaded");
		}
		console.log("maze loaded " + this.mazeLoaded + " of " + this.mazeCount);
	},
	
	onPlayerMove: function(to){
		var scene = this.el;
		var ray = new THREE.Raycaster();
		ray.near = 0;
		var a = new THREE.Vector3(to.x, to.y, to.z);
		
		var solids = scene.querySelectorAll(".solid");
		var solidObjects = [];
		for(var i = 0; i < solids.length; i++){
			solidObjects.push(solids[i].object3D);
		}
		
		for(var i = 0; i < this.clickableList.length; i++){
			var clickable = this.clickableList[i];
            if(!clickable.getAttribute("position")){
                continue;
            }
            
			var enable = false;

            var b = new THREE.Vector3();
            b.setFromMatrixPosition(clickable.object3D.matrixWorld);
            
			var dist = a.distanceTo(b);
			if(dist <= 20){
				var dir = new THREE.Vector3();
				dir.subVectors(b, a).normalize();
				
				ray.far = dist;
				ray.set(a, dir);
				var o = ray.intersectObjects(solidObjects, true);
				if(o.length == 0){
					enable = true;
				}
			}
			
			var hasClickable = clickable.classList.contains("clickable");
			if(hasClickable && !enable){
				clickable.classList.remove("clickable");
			}else if(!hasClickable && enable){
				clickable.classList.add("clickable");
			}
		}
		
		//update player's raycast list
		scene.querySelector("#player>.cursor").components.raycaster.refreshObjects();
	},
	
	onSetVariable: function(name, value){
		window.lostVars[name] = value;
	}
});