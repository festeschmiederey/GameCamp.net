let SYSTEM_LIST = [];

function AddSystem(id, system, components, components2)
{
	if (SYSTEM_LIST[id] == null)
	{
		SYSTEM_LIST[id] = [];
	}

	let info = {}

	info.system = system;
	info.components = [];
	info.entities = [];

	components.forEach(component => {
		info.components.push(component);
	});

	if (components2 != null)
	{
		info.components2 = [];
		info.entities2 = [];

		components2.forEach(component => {
			info.components2.push(component);
		});
	}

	SYSTEM_LIST[id].push(info);
}

function RunSystem(id, params)
{
	if (SYSTEM_LIST[id] != null) {
		SYSTEM_LIST[id].forEach(info => {
			info.entities.forEach(entity => {
				info.system(entity, params);
			});
		});
	}
}

function RunEntitiesSystem(id, entity, entity2)
{
	if (SYSTEM_LIST[id] != null) {
		SYSTEM_LIST[id].forEach(info => {
			if(info.entities2 != null && info.entities.includes(entity) && info.entities2.includes(entity2))
			{
				info.system(entity, entity2);
			}
		});
	}
}