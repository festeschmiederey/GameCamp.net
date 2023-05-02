let MAP_WIDTH = 0;
let MAP_HEIGHT = 0;
let MAP_ENTITY = {};
let LAYER_DEFAULT = "default";
let LAYER_LIST = [];
let MAP_COLL = [];

function InitMap(width, height, layers)
{
	MAP_WIDTH = width;
	MAP_HEIGHT = height;

	MAP_ENTITY[LAYER_DEFAULT] = [];
	MAP_ENTITY[LAYER_DEFAULT].length = MAP_WIDTH * MAP_HEIGHT;

	if(layers == null)
	{
		LAYER_LIST.push(LAYER_DEFAULT);
	}
	else
	{
		LAYER_LIST = layers;
	}

	LAYER_LIST.forEach(layer => {
		MAP_ENTITY[layer] = [];
		MAP_ENTITY[layer].length = MAP_WIDTH * MAP_HEIGHT;
	});

	for (let i = 0; i < MAP_WIDTH; i++)
	{
		MAP_COLL[i] = [];
		for (let k = 0; k < MAP_HEIGHT; k++)
		{
			MAP_COLL[i][k] = 1;
		}
	}
}

function SetMapData(data)
{
	ClearMap();

	for (let i = 0; i < data.length; i++)
	{
		if (data[i] != '.')
		{
			AddMapEntity(i % MAP_WIDTH, Math.floor(i / MAP_WIDTH), data[i]);
		}
	}
}

function GetMapData()
{
	let map = [];

	for (let x = 0; x < MAP_HEIGHT; x++)
	{
		for (let y = 0; y < MAP_WIDTH; y++)
		{	
			map[y * MAP_WIDTH + x] = '.';

			LAYER_LIST.forEach(layer => {
				if (MAP_ENTITY[layer][y * MAP_WIDTH + x] != null)
				{
					map[y * MAP_WIDTH + x] = MAP_ENTITY[layer][y * MAP_WIDTH + x].Map.symbol;
				}
			});
		}
	}

	return map.join('');
}

function SetEntityPosition(layer, x, y, x2, y2)
{
	MAP_ENTITY[layer][y * MAP_WIDTH + x].Map.x = x2;
	MAP_ENTITY[layer][y * MAP_WIDTH + x].Map.y = y2;

	if (MAP_ENTITY[layer][y2 * MAP_WIDTH + x2] != null)
	{
		RemoveEntity(MAP_ENTITY[layer][y2 * MAP_WIDTH + x2]);
	}

	MAP_ENTITY[layer][y2 * MAP_WIDTH + x2] = MAP_ENTITY[layer][y * MAP_WIDTH + x];
	MAP_ENTITY[layer][y * MAP_WIDTH + x] = null;
}

function AddMapEntity(x, y, id)
{
	let entity = AddEntity(id, null, {Map: {symbol: id, x: x, y: y, sx: x, sy: y}});

	LAYER_LIST.forEach(layer => {
		if(entity[layer] != null)
		{
			entity.Layer = layer;
		}
	});

	if (entity.Layer == null)
	{
		entity.Layer = LAYER_DEFAULT;
	}

	if (MAP_ENTITY[entity.Layer][y * MAP_WIDTH + x] != null)
	{
		RemoveEntity(MAP_ENTITY[entity.Layer][y * MAP_WIDTH + x]);
	}

	MAP_ENTITY[entity.Layer][y * MAP_WIDTH + x] = entity;
}

function RemoveMapEntity(layer, x, y)
{
	RemoveEntity(MAP_ENTITY[layer][y * MAP_WIDTH + x]);
	MAP_ENTITY[layer][y * MAP_WIDTH + x] = null;
}

function ClearMap()
{
	LAYER_LIST.forEach(layer => {
		for (let x = 0; x < MAP_WIDTH; x++)
		{
			for (let y = 0; y < MAP_HEIGHT; y++)
			{	
				if (MAP_ENTITY[layer][y * MAP_WIDTH + x] != null)
				{
					RemoveMapEntity(layer, x, y)
				}
			}
		}
	});
}

function ClearTile(x, y)
{
	LAYER_LIST.forEach(layer => {
		if (MAP_ENTITY[layer][y * MAP_WIDTH + x] != null)
		{
			RemoveMapEntity(layer, x, y)
		}
	});
}

function GetMapEntity(layer, x, y)
{
	return MAP_ENTITY[layer][y * MAP_WIDTH + x];
}

function IsMapEmpty(layers, x, y)
{
	let valid = true;

	layers.forEach(layer => {
		if(MAP_ENTITY[layer][y * MAP_WIDTH + x] != null)
		{
			valid = false;
		}
	});

	return valid;
}

function GetPath(layers, x, y, tx, ty)
{
	for (let i = 0; i < MAP_WIDTH; i++)
	{
		for (let k = 0; k < MAP_HEIGHT; k++)
		{
			MAP_COLL[i][k] = 1;

			if ((x == i && y == k) || (tx == i && ty == k))
			{
				MAP_COLL[i][k] = 1;
			}
			else
			{
				layers.forEach(layer => {
					if(MAP_ENTITY[layer][k * MAP_WIDTH + i] != null)
					{
						MAP_COLL[i][k] = 0;
					}
				});
			}
		}
	}

	let graph = new Graph(MAP_COLL);
	let start = graph.grid[x][y];
	let end = graph.grid[tx][ty];

	return astar.search(graph, start, end);
}