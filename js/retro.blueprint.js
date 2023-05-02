let BLUEPRINT_LIST = {};

function AddBlueprint(name, tags, components){
	let blueprint = {};

	tags.forEach(tag => {
		if(typeof COMPONENT_LIST[tag] === "object"){
			blueprint[tag] = {...COMPONENT_LIST[tag]};
		}
		else{
			blueprint[tag] = COMPONENT_LIST[tag];
		}
	});

	for (const component in components) {
		if(typeof COMPONENT_LIST[component] === "object"){
			blueprint[component] = {...COMPONENT_LIST[component]};

			for(let val in components[component]){
				blueprint[component][val] = components[component][val];
			}
		}
		else{
			blueprint[component] = components[component];
		}
	}

	BLUEPRINT_LIST[name] = blueprint;
}