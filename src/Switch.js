AFRAME.registerComponent("switch", {
	schema: {
		target: {type: "selector"},
		event: {type: "string"},
		data: {type: "array"}
	},
	
	init: function(){
		var _this = this;
		if(this.el){
			this.el.addEventListener("click", function(){_this.onClick()});
		}
	},
	
	onClick: function(){
		this.data.target.emit(this.data.event, this.data.data);
	}
});