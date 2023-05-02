
let COMPONENT_LIST = {};

function AddComponent(name, data)
{
	if(data == null){
		COMPONENT_LIST[name] = true;
	}
	else{
		COMPONENT_LIST[name] = data;
	}
}