AFRAME.registerComponent("levelchange", {
	schema: {
		level: {type: "string"},
		delay: {type: "number", default: 0},
		position: {type: "vec3"}
	},
	
	init: function(){
		var _this = this;
		if(this.el){
			this.el.addEventListener("click", function(){_this.transition()});
		}
		
		this.timer = this.data.delay;
		this.lit = false;
		this.triggered = false;
	},
		
	tick: function(time, delta){
		if(this.lit){
			this.timer -= delta;
			if(this.timer <= 0){
				this.el.sceneEl.emit("changeLevel", {level: this.data.level, position: this.data.position}, false);
				this.lit = false;
			}
		}
	},
	
	transition: function(){
		if(!this.triggered){
			this.lit = true;
			this.triggered = true;
		}
	}
});