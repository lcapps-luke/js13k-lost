AFRAME.registerComponent("lost", {
	init: function () {
		this.clickableList = [];
		
		var _this = this;
		this.el.addEventListener("changeLevel", function(e){_this.loadScene(e.detail.level, e.detail.position)});
		
		this.player = this.el.sceneEl.querySelector("#player");
		this.player.addEventListener("move", function(pos){_this.onPlayerMove(pos.detail)});
		
		this.loadScene("start.json");
	},
	
	tick: function(time, delta){
		
	},
	
	loadScene: function(sceneName, position){
		var scene = this.el;
		
		//cleanup scene
		var old = scene.querySelectorAll("a-scene>.vr:not(.global)");
		for(var i = 0; i < old.length; i++){
			scene.removeChild(old[i]);
		}
		
		//read scene json
		var sceneJson = LevelDef.level[sceneName];
		SceneBuilder.buildChildren(scene, sceneJson.objects);
		
		this.clickableList = scene.querySelectorAll(".clickable");
		
		console.log(position);
		var pos = position ? position : sceneJson.player;
		
		this.player.setAttribute("position", pos);
		this.onPlayerMove(pos);
		
		this.el.emit("loaded");
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
			var enable = false;
			
			var pos = clickable.getAttribute("position");
			if(!pos){
				continue;
			}
			
			var b = new THREE.Vector3(pos.x, pos.y, pos.z);
			var dist = a.distanceTo(b);
			if(dist <= 10){
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
	}
});