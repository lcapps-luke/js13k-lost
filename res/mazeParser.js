module.exports = function(src){
	floor = parseObjects(findLayer("Floor", src.layers));
	solid = parseObjects(findLayer("Solid", src.layers))
	
	return {
		floor: floor,
		solid: solid,
		width: src.width * src.tilewidth,
		height: src.height * src.tileheight
	};
}

function findLayer(name, list){
	for(var i in list){
		if(list[i].name == name){
			return list[i];
		}
	}
	throw "Could not find layer " + name;
}

function parseObjects(layer){
	var obj = [];
	
	for(var i in layer.objects){
		obj.push(parseObject(layer.objects[i]));
	}
	
	return obj;
}

function parseObject(obj){
	return {
		x: obj.x,
		y: obj.y,
		width: obj.width,
		height: obj.height
	}
}