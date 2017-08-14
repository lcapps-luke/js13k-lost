AFRAME.registerComponent("navigation", {
	init: function(){
		var _this = this;
		if(this.el){
			console.log(this.el);
			this.el.addEventListener("click", function(){_this.click()});
		}
	},
	
	click: function(){
		console.log("Nav node clicked!");
		var player = this.el.sceneEl.querySelector('#player');
		
		var thisPos = this.el.getAttribute("position");
		var playerPos = player.getAttribute("position");
		
		player.setAttribute("position", {x: thisPos.x, y: playerPos.y, z: thisPos.z});
		this.el.setAttribute("visible", false);
		
		var navList = this.el.sceneEl.querySelectorAll("[navigation]");
		for(var i = 0; i < navList.length; i++){
			var nav = navList[i];
			
			if(nav !== this.el){
				nav.setAttribute("visible", true);
			}
		}
	}
	
});