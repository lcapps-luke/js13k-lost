var SoundLibrary = (function(){
	var src = {
		click: [0,0.16,0.184,0.944,0.144,0.272,0.16,-0.008,-0.472,0.16,0.4479,-0.2319,0.472,0.368,0.008,,0.04,0.328,1,0.072,0.944,,0.008,0.5]
	};
	
	var lib = {};
	
	for(var i in src){
		lib[i] = jsfxr(src[i]);
	}
	
	return lib;
})();