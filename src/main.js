AFRAME.registerComponent("lost", {
	init: function () {
		this.loadScene("start.json");
	},
	
	tick: function(time, delta){
		
	},
	
	loadScene: function(sceneName){
		var scene = this.el;
		
		//read scene json
		var sceneJson = LevelDef.level[sceneName];

		for(var i = 0; i < sceneJson.length; i++){
			var def = sceneJson[i];
			//TODO skip if scene has element with same id
			this.buildElement(scene, def);
		}
		//create map of new element ids
		
		//remove elements from current scene
			//keep elements with ids that are in new scene map and remove them from the map
		//add new elements
	},
	
	buildElement: function(parent, def){
		var template = {};
		if("template" in def){
			template = LevelDef.template[def.template];
		}
		
		var ele = document.createElement(this.coalesceVar("type", def, template));
		var attr = this.mergeAttr(template, def);
		for(var i in attr){
			ele.setAttribute(i, attr[i]);
		}
		
		if("children" in template){
			for(var i = 0; i < template.children.length; i++){
				this.buildElement(ele, template.children[i]);
			}
		}
		
		if("children" in def){
			for(var i = 0; i < def.children.length; i++){
				this.buildElement(ele, def.children[i]);
			}
		}
		
		//console.log(ele);
		parent.appendChild(ele);
	},
										 
	coalesceVar: function(variable, a, b){
		return (variable in a) ? a[variable] : b[variable];
	},
	
	mergeAttr: function(a, b){
		var res = {};
		if("attr" in a){
			for(var i in a.attr){
				res[i] = a.attr[i];
			}
		}
		if("attr" in b){
			for(var i in b.attr){
				res[i] = b.attr[i];
			}
		}
		return res;
	}
});