AFRAME.registerComponent("switch", {
	schema: {
		target: {type: "selector"},
		event: {type: "string"}
	},
	
	init: function(){
		var _this = this;
		if(this.el){
			this.el.addEventListener("click", function(){_this.onClick()});
		}
	},
	
	onClick: function(){
		console.log("triggering " + this.data.event + " on target:");
		console.log(this.data.target);
		this.data.target.emit(this.data.event);
	}
});