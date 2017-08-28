AFRAME.registerComponent("forest", {
	schema: {
		type: "vec2"
	},
	
	init: function(){
		this.el;
		
		var margin = 0.8;
		var d = 2; //margin * 2 + d = max
		
		var w = this.data.x;
		var h = this.data.y;
		
		for(var gx = 0; gx < w; gx += margin * 2 + d){
			for(var gy = 0; gy < h; gy += margin * 2 + d){
				var tx = gx + margin + (Math.random() * d);
				var ty = gy + margin + (Math.random() * d);
				var th = Math.random() * -3;
				
				var tree = SceneBuilder.buildElement(LevelDef.template.tree);
				tree.setAttribute("position", tx + " " + th + " " + ty);
				
				this.el.appendChild(tree);
			}
		}
	},
});