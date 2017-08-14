AFRAME.registerComponent("navigation", {
	init: function(){
		var _this = this;
		if(this.el){
			this.el.addEventListener("click", function(){_this.click()});
		}
	},
	
	click: function(){
		var player = this.el.sceneEl.querySelector("#player");

		var thisPos = this.el.getAttribute("position");
		var playerPos = player.getAttribute("position");
		
		var pos = "" + thisPos.x + " " + playerPos.y + " " + thisPos.z;
		
		var animation = document.createElement("a-animation");
		animation.setAttribute("attribute", "position");
		animation.setAttribute("to", pos);
		animation.setAttribute("dur", "500");
		animation.setAttribute("repeat", "0");
		
		player.appendChild(animation);
		
		//Hide this nav
		this.el.setAttribute("visible", false);
		
		//Reset other navs
		var navList = this.el.sceneEl.querySelectorAll("[navigation]");
		for(var i = 0; i < navList.length; i++){
			var nav = navList[i];
			
			if(nav !== this.el){
				nav.setAttribute("visible", true);
			}
		}
	}
	
});