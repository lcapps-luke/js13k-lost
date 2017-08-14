AFRAME.registerComponent("lookat", {
	schema: {
		type: "selector",
		default: "[camera]"
	},
	
	init: function(){
		this.target = null;
	},
	
	update: function () {
		if(!this.data){
			return;
		}
		
		console.log(this.data);
		
		if (this.data.hasLoaded) {
			this.target = this.data.object3D;
		}else{
			var self = this;
			return self.data.addEventListener('loaded', function () {
				self.target = self.data.object3D;
			});
		}
	},
	
	tick: function(){
		if(!this.target){
			return;
		}
		
		var targetPos = this.el.object3D.parent.worldToLocal(this.target.getWorldPosition());
		var vector = null;
		
		if (this.el.getObject3D('camera')) {
			vector.subVectors(this.el.object3D.position, targetPos).add(this.el.object3D.position);
		} else {
			vector = targetPos;
		}
		this.el.object3D.lookAt(vector);
	}
});