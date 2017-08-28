AFRAME.registerComponent("lostsound", {
	schema: {
		snd: {type: "string"},
		on: {type: "string"},
	},
	
	init: function(){
		this.el.setAttribute("sound", "src: url(" + SoundLibrary[this.data.snd] + "); on: " + this.data.on);
	}
});