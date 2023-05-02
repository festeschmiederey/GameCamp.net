let ENTITY_LIST = {};

function AddEntity(blueprint, tags, components)
{
	let entity = {};

	for (const component in BLUEPRINT_LIST[blueprint]) {
		if(ENTITY_LIST[component] == null)
		{
			ENTITY_LIST[component] = [];
		}

		ENTITY_LIST[component].push(entity);

		if (typeof BLUEPRINT_LIST[blueprint][component] === "object") {
			entity[component] = {...BLUEPRINT_LIST[blueprint][component]};
		}
		else
		{
			entity[component] = BLUEPRINT_LIST[blueprint][component];
		}
	}

	if (tags != null){
		tags.forEach(tag => {
			if(typeof COMPONENT_LIST[tag] === "object"){
				entity[tag] = {...COMPONENT_LIST[tag]};
			}
			else{
				entity[tag] = COMPONENT_LIST[tag];
			}
		});
	}

	for (const component in components) {
		if(typeof COMPONENT_LIST[component] === "object"){
			entity[component] = {...COMPONENT_LIST[component]};

			for(let val in components[component]){
				entity[component][val] = components[component][val];
			}
		}
		else{
			entity[component] = components[component];
		}
	}

	for (const id in SYSTEM_LIST) {
		SYSTEM_LIST[id].forEach(info => {
			let valid = true;

			info.components.forEach(component => {
				if (entity[component] == null)
				{
					valid = false;
				}
			});

			if(valid == true)
			{
				info.entities.push(entity);

				if (id == "Create")
				{
					info.system(entity);
				}
			}

			if(info.components2 != null)
			{
				valid = true;

				info.components2.forEach(component => {
					if (entity[component] == null)
					{
						valid = false;
					}
				});
	
				if(valid == true)
				{
					info.entities2.push(entity);
				}
			}
		});
	}

	return entity;
}

function RemoveEntity(entity)
{
	for (const tag in ENTITY_LIST) {
		if(entity[tag] != null)
		{
			ENTITY_LIST[tag] = ENTITY_LIST[tag].filter(it => it !== entity);
		}
	}

	for (const id in SYSTEM_LIST) {
		SYSTEM_LIST[id].forEach(info => {
			info.entities = info.entities.filter(it => it !== entity);

			if(info.entities2 != null)
			{
				info.entities2 = info.entities2.filter(it => it !== entity);
			}
		});
	}
}

function GetEntity(tag)
{
	return ENTITY_LIST[tag][0];
}