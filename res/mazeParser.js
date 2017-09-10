module.exports = function(src){
	floor = parseObjects(findLayer("Floor", src.layers));
	solid = parseObjects(findLayer("Solid", src.layers));
	nav = parseNavs(findLayer("Nav", src.layers));
    swi = parseSwitchs(findLayer("Switch", src.layers));
    door = parseDoors(findLayer("Door", src.layers));
	
	return {
		floor: floor,
		solid: solid,
		nav: nav,
        switch: swi,
        door: door,
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

function parseLayer(layer, objParser){
    var obj = [];
	
	for(var i in layer.objects){
		obj.push(objParser(layer.objects[i]));
	}
	
	return obj;
}

function parseObjects(layer){
	return parseLayer(layer, parseObject);
}

function parseObject(obj){
	return {
		x: obj.x,
		y: obj.y,
		width: obj.width,
		height: obj.height
	};
}

function parseNavs(layer){
	return parseLayer(layer, parseNav);
}

function parseNav(obj){
	return {
		x: obj.x + obj.width / 2,
		y: obj.y + obj.height / 2
	};
}

function parseSwitchs(layer){
    return parseLayer(layer, parseSwitch);
}

function parseSwitch(obj){
    return {
        x: obj.x + obj.width / 2,
        y: obj.y + obj.height / 2,
        type: obj.properties.type,
        target: obj.properties.target
    };
}

function parseDoors(layer){
    return parseLayer(layer, parseDoor);
}

function parseDoor(obj){
    return {
        x: obj.x,
		y: obj.y,
		width: obj.width,
		height: obj.height,
        name: obj.name,
        openPos: {
            x: obj.properties.open_x,
            y: obj.properties.open_y,
            z: obj.properties.open_z
        }
    };
}