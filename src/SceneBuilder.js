var SceneBuilder = (function(){
	function mergeAttr(a, b){
		var res = {};
		if("attr" in a){
			for(var i in a.attr){
				res[i] = a.attr[i];
			}
		}
		if("attr" in b){
			for(var i in b.attr){
				res[i] = b.attr[i];
			}
		}
		return res;
	}
	
	function coalesceVar(variable, a, b){
		return (variable in a) ? a[variable] : b[variable];
	}
	
	function buildElement(def){
		var template = {};
		if("template" in def){
			template = LevelDef.template[def.template];
		}
		
		var ele = document.createElement(coalesceVar("type", def, template));
		var attr = mergeAttr(template, def);
		for(var i in attr){
			ele.setAttribute(i, attr[i]);
		}
		
		if("children" in template){
			buildChildren(ele, template.children);
		}
		
		if("children" in def){
			buildChildren(ele, def.children);
		}
		
		ele.classList.add("vr");
		return ele;
	}
	
	function buildChildren(parent, defList){
		for(var i = 0; i < defList.length; i++){
			var c = buildElement(defList[i]);
			parent.appendChild(c);
		}
	}

	return {
		buildElement: buildElement,
		buildChildren: buildChildren
	};
})();