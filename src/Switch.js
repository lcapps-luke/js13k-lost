AFRAME.registerComponent("switch", {
	schema: {
		target: {type: "selector"},
		event: {type: "string"},
		data: {type: "array"},
        indicator: {type: "selector"}
	},
	
	init: function(){
		var _this = this;
		if(this.el){
			this.el.addEventListener("click", function(){_this.onClick()});
		}
	},
	
	onClick: function(){
        console.log(this.data);
		this.data.target.emit(this.data.event, this.data.data);
        if(this.data.indicator){
            this.data.indicator.emit("activated");
        }
	}
});