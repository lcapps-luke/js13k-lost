AFRAME.registerComponent("clickableupdator", {
	schema: {
		type: "number",
		default: 0
	},
	
	init: function(){
		this.timer = this.data;
		this.running = false;
		
		var _this = this;
		this.el.addEventListener("click", function(){_this.onClick()});
		
		console.log("updator for " + this.timer);
	},
	
	onClick: function(){
		this.timer = this.data;
		this.running = true;
		console.log("updator triggered " + this.timer);
	},
	
	tick: function(time, delta){
		if(this.running){
			this.timer -= delta;
			
			if(this.timer <= 0){
				this.running = false;
				
				var player = this.el.sceneEl.querySelector("#player");
				player.emit("move", player.getAttribute("position"));
				console.log("update!!!");
			}
		}
	},
});
