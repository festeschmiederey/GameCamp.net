function InitGame()
{
	InitGraphics(256, 128, "gc_tiles.png");
	
	let palette = " ║ ═ ╚ ╔ ╗ ╝ ╣ ╩ ╠ ╦ ╬ ";

	let map = [
		'.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.',
		'╔','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','╗',
		'║','@','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','║',
		'║','o','╔','═','═','═','o','╔','═','╗','o','║','o','o','o','║','o','╔','═','═','o','o','o','o','o','o','o','o','o','o','o','║',
		'║','o','║','o','o','o','o','║','o','║','o','╠','═','╦','═','╣','o','║','o','o','o','o','o','o','o','o','o','o','0','1','o','║',
		'║','o','║','o','═','╗','o','╠','═','╣','o','║','o','║','H','║','o','╠','═','o','o','o','o','o','M','o','o','o','o','o','o','║',
		'║','o','║','o','o','║','o','║','o','║','o','║','o','o','o','║','o','║','o','o','o','o','o','o','o','o','o','m','a','y','o','║',
		'║','o','╚','═','═','╝','o','║','o','║','o','║','o','o','o','║','o','╚','═','═','o','o','o','o','o','o','o','o','o','o','o','║',
		'║','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','2','0','2','3','o','║',
		'║','o','o','o','o','o','o','╔','═','═','o','╔','═','╗','o','║','o','o','o','║','o','╔','═','╗','o','o','o','o','o','o','o','║',
		'║','o','o','o','o','o','o','║','o','o','o','║','o','║','o','╠','═','╦','═','╣','o','║','o','║','o','o','o','o','o','o','o','║',
		'║','o','o','o','o','o','o','║','o','o','o','╠','═','╣','o','║','o','║','o','║','o','╠','═','╝','o','o','o','o','o','o','o','║',
		'║','o','o','R','o','o','o','║','o','o','o','║','S','║','o','║','o','o','o','║','o','║','o','o','o','B','o','o','o','o','o','║',
		'║','o','o','o','o','o','o','╚','═','═','o','║','o','║','o','║','o','o','o','║','o','║','o','o','o','o','o','o','o','o','o','║',
		'║','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','║',
		'╚','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','╝'
	];

	InitMap(32, 16, ["Ground", "Tile", "Object", "Item", "Unit"]);

	AddComponent("Hero");
	AddComponent("Ground");
	AddComponent("Tile");
	AddComponent("Object");
	AddComponent("AI", {state: "idle"});
	AddComponent("Sprite", 0);
	AddComponent("Health", {value: 0, max: 0});
	AddComponent("Attack", 0);
	AddComponent("Defend", 0);
	AddComponent("Speed", 1);
	AddComponent("Score", 0);
	AddComponent("Control", "none");
	AddComponent("Action", "idle");
	AddComponent("Position", {x: 0, y: 0});
	AddComponent("Movement", {x: 0, y: 0});
	AddComponent("Map", {x: 0, y: 0, sx: 0, sy: 0});
	AddComponent("Pushable");
	AddComponent("Unit");
	AddComponent("Item", {component: "unknown", param: null, value: 0});
	AddComponent("Drop", " ");
	AddComponent("HUD");

	// Create System
	AddSystem("Create", OnSimPositionSystem, ["Map", "Position"]);

	// Click System
	AddSystem("Click", OnEditorSystem, ["Editor"]);

	// Draw Systems
	AddSystem("Draw", OnDrawMapSystem, ["Map", "Ground", "Sprite"]);
	AddSystem("Draw", OnDrawMapSystem, ["Map", "Tile", "Sprite"]);
	AddSystem("Draw", OnDrawSpriteSystem, ["Position", "Object", "Sprite"]);
	AddSystem("Draw", OnDrawMapSystem, ["Map", "Sprite", "Item"]);
	AddSystem("Draw", OnDrawSpriteSystem, ["Position", "Sprite", "Unit"]);
	AddSystem("Draw", OnDrawHUDSystem, ["Position", "Health", "AI", "HUD"]);
	AddSystem("Draw", DrawHeroUISystem, ["Hero", "Health"]);

	// Input Systems
	AddSystem("Input", OnInputSystem, ["Hero", "Movement"]);

	// Sim Start Systems
	//AddSystem("SimStart", OnObjectStartSystem, ["Object", "Map", "Movement"]);
	AddSystem("SimStart", OnHeroStartSystem, ["Hero", "Map", "Movement"]);
	AddSystem("SimStart", OnAIStartSystem, ["AI", "Map", "Movement", "Health"]);
	AddSystem("SimStart", OnSimPositionSystem, ["Map", "Position"]);

	// Sim Loop Systems
	AddSystem("SimLoop", OnSimMoveSystem, ["Map", "Position"]);

	// Sim End Systems
	AddSystem("SimEnd", OnUnitEndSystem, ["Map", "Action", "Movement"]);
	AddSystem("SimEnd", OnHeroEndSystem, ["Unit"]);
	AddSystem("SimEnd", OnSimPositionSystem, ["Map", "Position"]);

	// Collision Systems
	AddSystem("Collision", OnGroundCollisionSystem, ["Unit"], ["Ground"]);
	AddSystem("Collision", OnItemCollisionSystem, ["Unit"], ["Item"]);
	AddSystem("Collision", OnUnitCollisionSystem, ["Unit", "Health"], ["Unit", "Health"]);
	AddSystem("Collision", OnTileCollisionSystem, ["Unit"], ["Tile"]);
	AddSystem("Collision", OnObjectCollisionSystem, ["Unit"], ["Object"]);

	// Units
	AddBlueprint("@", ["Hero", "Unit", "Position", "Action", "Speed", "Map", "Movement", "Score"], {Sprite: 4, Control: "input", Health: {value: 3, max: 3}, Attack: 1, Defend: 0});
	AddBlueprint("S", ["AI", "Unit", "Position", "Action", "Speed", "Map", "Movement", "HUD"], {Sprite: 20, Control: "ai", Health: {value: 3, max: 3}, Attack: 1, Drop: 'H'});
	AddBlueprint("B", ["AI", "Unit", "Position", "Action", "Speed", "Map", "Movement", "HUD"], {Sprite: 13, Control: "ai", Health: {value: 4, max: 4}, Attack: 2, Drop: 'H'});
	AddBlueprint("R", ["AI", "Unit", "Position", "Action", "Speed", "Map", "Movement", "HUD"], {Sprite: 22, Control: "ai", Health: {value: 2, max: 2}, Attack: 1, Drop: 'H'});

	// Ground
	AddBlueprint("F", ["Ground", "Map"], {Sprite: 136, Effect: {component: "Health", param: "value", value: -1}});

	// Tiles
	AddBlueprint("#", ["Tile", "Map"], {Sprite: 121});
	AddBlueprint("T", ["Tile", "Map"], {Sprite: 84});
	
	AddBlueprint("║", ["Tile", "Map"], {Sprite: 16});
	AddBlueprint("═", ["Tile", "Map"], {Sprite: 1});

	AddBlueprint("╚", ["Tile", "Map"], {Sprite: 32});
	AddBlueprint("╔", ["Tile", "Map"], {Sprite: 0});
	AddBlueprint("╗", ["Tile", "Map"], {Sprite: 2});
	AddBlueprint("╝", ["Tile", "Map"], {Sprite: 34});

	AddBlueprint("╣", ["Tile", "Map"], {Sprite: 48});
	AddBlueprint("╩", ["Tile", "Map"], {Sprite: 19});
	AddBlueprint("╠", ["Tile", "Map"], {Sprite: 35});
	AddBlueprint("╦", ["Tile", "Map"], {Sprite: 3});

	AddBlueprint("╬", ["Tile", "Map"], {Sprite: 49});

	AddBlueprint("0", ["Tile", "Map"], {Sprite: 176});
	AddBlueprint("1", ["Tile", "Map"], {Sprite: 177});
	AddBlueprint("2", ["Tile", "Map"], {Sprite: 178});
	AddBlueprint("3", ["Tile", "Map"], {Sprite: 179});
	AddBlueprint("4", ["Tile", "Map"], {Sprite: 180});
	AddBlueprint("5", ["Tile", "Map"], {Sprite: 181});
	AddBlueprint("6", ["Tile", "Map"], {Sprite: 182});
	AddBlueprint("7", ["Tile", "Map"], {Sprite: 183});
	AddBlueprint("8", ["Tile", "Map"], {Sprite: 184});
	AddBlueprint("9", ["Tile", "Map"], {Sprite: 185});

	AddBlueprint("m", ["Tile", "Map"], {Sprite: 192});
	AddBlueprint("a", ["Tile", "Map"], {Sprite: 193});
	AddBlueprint("y", ["Tile", "Map"], {Sprite: 194});

	// Objects
	AddBlueprint("P", ["Object", "Map", "Pushable", "Movement", "Position", "Action", "Speed"], {Sprite: 122});

	// Items
	AddBlueprint("H", ["Map"], {Sprite: 171, Item: {component: "Health", param: "value", value: 2}});
	AddBlueprint("M", ["Map"], {Sprite: 170, Item: {component: "Health", param: "max", value: 1}});
	AddBlueprint("D", ["Map"], {Sprite: 70, Item: {component: "Attack", value: 1}});
	AddBlueprint("C", ["Map"], {Sprite: 42, Item: {component: "Defend", value: 1}});

	AddBlueprint("o", ["Map"], {Sprite: 17, Item: {component: "Score", value: 1}});

	// Editor
	AddBlueprint("Editor", ["Editor"]);

	AddEntity("Editor");

	SetMapData(map);

	InitSim();
}

function OnEditorSystem(entity, event)
{
	if(entity.Editor.selection != ".")
	{
		AddMapEntity(Math.floor(event.offsetX / 32), Math.floor(event.offsetY / 32), entity.Editor.selection);
	}
	else
	{
		ClearTile(Math.floor(event.offsetX / 32), Math.floor(event.offsetY / 32));
	}
}

function OnHeroStartSystem(entity)
{
	hero = entity;

	if(entity.Movement.x < 0)
	{
		entity.Sprite = 6;
	}
	else if(entity.Movement.x > 0)
	{
		entity.Sprite = 4;
	}

	if(entity.Movement.y < 0)
	{
		entity.Sprite = 7;
	}
	else if(entity.Movement.y > 0)
	{
		entity.Sprite = 5;
	}

	OnUnitStartSystem(hero);
}

function OnAIStartSystem(entity)
{
	let dist = Math.hypot(entity.Map.x - hero.Map.x, entity.Map.y - hero.Map.y);

	if (entity.Health.value <= 0)
	{
		entity.AI.state = "death";
	}
	else if (dist <= 4)
	{
		entity.AI.state = "attack";

		let path = GetPath(["Ground", "Tile", "Object", "Unit"], entity.Map.x, entity.Map.y, hero.Map.x, hero.Map.y);

		if (path.length >= 1)
		{
			MoveEntity(entity, path[0].x - entity.Map.x, path[0].y - entity.Map.y);
		}
	}
	else if (dist <= 5)
	{
		entity.AI.state = "alarm";
	}
	else
	{
		entity.AI.state = "idle";
	}

	OnUnitStartSystem(entity);
}

function OnObjectStartSystem(entity)
{
	OnUnitStartSystem(entity);
}

function OnUnitStartSystem(entity)
{
	if(entity.Movement.x != 0 || entity.Movement.y != 0)
	{
		let tx = entity.Map.x + entity.Movement.x;
		let ty = entity.Map.y + entity.Movement.y;

		if (IsMapEmpty(["Tile", "Object", "Unit"], tx, ty))
		{
			SetEntityPosition(entity.Layer, entity.Map.x, entity.Map.y, tx, ty);
		}
		else
		{
			["Tile", "Object", "Unit"].forEach(layer =>
			{
				let target = GetMapEntity(layer, tx, ty);

				if (target != null && entity.Map.x == entity.Map.sx && entity.Map.y == entity.Map.sy)
				{
					if(target.Map.x == target.Map.sx && target.Map.y == target.Map.sy)
					{
						RunEntitiesSystem("Collision", entity, target);
					}
					else
					{
						entity.Movement.x = 0;
						entity.Movement.y = 0;
					}
				}
			});
		}
	}
}

function OnHeroEndSystem(entity)
{
	let item = GetMapEntity("Item", entity.Map.x, entity.Map.y);

	if (item != null)
	{
		RunEntitiesSystem("Collision", entity, item);
	}

	let ground = GetMapEntity("Ground", entity.Map.x, entity.Map.y);

	if (ground != null)
	{
		RunEntitiesSystem("Collision", entity, ground);
	}

	if (entity.Health.value <= 0)
	{
		RemoveMapEntity(entity.Layer, entity.Map.x, entity.Map.y);

		if (entity.Drop != null)
		{
			AddMapEntity(entity.Map.x, entity.Map.y, entity.Drop);
		}
	}
}

function OnUnitEndSystem(entity)
{
	entity.Map.sx = entity.Map.x;
	entity.Map.sy = entity.Map.y;
	entity.Action = "idle";

	entity.Movement.x = 0;
	entity.Movement.y = 0;
}

function OnDrawMapSystem(entity)
{
	DrawTile(entity.Sprite,  entity.Map.x * 8,  entity.Map.y * 8);
}

function OnSimPositionSystem(entity)
{
	entity.Position.x = entity.Map.x * 8;
	entity.Position.y = entity.Map.y * 8;
}

function OnSimMoveSystem(entity, step)
{
	if(entity.Movement.x != 0 || entity.Movement.y != 0)
	{
		entity.Position.x = entity.Map.sx * 8 - Math.floor((step + 1) * entity.Speed * -entity.Movement.x);
		entity.Position.y = entity.Map.sy * 8 - Math.floor((step + 1) * entity.Speed * -entity.Movement.y);
	}
	else
	{
		entity.Position.x = entity.Map.x * 8;
		entity.Position.y = entity.Map.y * 8;
	}
}

function OnDrawHUDSystem(entity)
{
	if (entity.AI.state == "alarm")
	{
		DrawTile(172, entity.Position.x,  entity.Position.y - 8);
	}

	for(let i = 0; i < entity.Health.max; i++)
	{
		if(entity.Health.value > i)
		{
			GFX_CTX.fillStyle = "#EB564B";
		}
		else
		{
			GFX_CTX.fillStyle = "#606070";
		}

		if(entity.Health.max == 2)
		{
			GFX_CTX.fillRect(entity.Position.x + i * 4,  entity.Position.y - 2, 3, 1);
		}
		else if(entity.Health.max == 3)
		{
			GFX_CTX.fillRect(entity.Position.x + i * 3,  entity.Position.y - 2, 2, 1);
		}
		else if(entity.Health.max == 4)
		{
			GFX_CTX.fillRect(entity.Position.x + i * 2,  entity.Position.y - 2, 1, 1);
		}
	}
}

function OnDrawSpriteSystem(entity)
{
	DrawTile(entity.Sprite, entity.Position.x, entity.Position.y);
}

function DrawHeroUISystem(entity)
{
	for(let i = 0; i < entity.Health.max; i++)
	{
		if (i < entity.Health.value)
		{
			DrawTile(102, (i + 1) * 8, 0);
		}
		else
		{
			DrawTile(100, (i + 1) * 8, 0);
		}
	}

	DrawTile(160 + Math.floor(entity.Score / 100) % 10, 28 * 8, 0);
	DrawTile(160 + Math.floor(entity.Score / 10) % 10, 29 * 8, 0);
	DrawTile(160 + entity.Score % 10, 30 * 8, 0);
}

function OnGroundCollisionSystem(entity, ground)
{
	if(entity[ground.Effect.component] != null)
	{
		if (ground.Effect.param == null)
		{
			entity[ground.Effect.component] += ground.Effect.value;
		}
		else if (ground.Effect.param == "value")
		{
			entity[ground.Effect.component].value = Math.min(entity[ground.Effect.component].value + ground.Effect.value, entity[ground.Effect.component].max);
		}
		else if (ground.Effect.param == "max")
		{
			entity[ground.Effect.component].max += ground.Effect.value;
			entity[ground.Effect.component].value += ground.Effect.value;
		}
	}
}

function OnItemCollisionSystem(entity, item)
{
	if(entity[item.Item.component] != null)
	{
		if (item.Item.param == null)
		{
			entity[item.Item.component] += item.Item.value;
			RemoveMapEntity("Item", entity.Map.x, entity.Map.y);
		}
		else if (item.Item.param == "value")
		{
			if (entity[item.Item.component].value < entity[item.Item.component].max)
			{
				entity[item.Item.component].value = Math.min(entity[item.Item.component].value + item.Item.value, entity[item.Item.component].max);
				RemoveMapEntity("Item", entity.Map.x, entity.Map.y);
			}
		}
		else if (item.Item.param == "max")
		{
			entity[item.Item.component].max += item.Item.value;
			entity[item.Item.component].value += item.Item.value;
			RemoveMapEntity("Item", entity.Map.x, entity.Map.y);
		}
	}
}

function OnUnitCollisionSystem(entity, target)
{
	if (entity.Health.value > 0)
	{
		target.Health.value -= entity.Attack;

		entity.Speed = 0.5;
		entity.Action = "attack";
	}
}

function OnObjectCollisionSystem(entity, object)
{
	if (object.Pushable == true)
	{
		if(IsMapEmpty(["Tile", "Object", "Unit"], object.Map.x + entity.Movement.x, object.Map.y + entity.Movement.y))
		{
			entity.Speed = 1;
			entity.Action = "move";
			object.Speed = 1;
			object.Action = "move";
			object.Movement.x = entity.Movement.x;
			object.Movement.y = entity.Movement.y;
			SetEntityPosition(object.Layer, object.Map.x, object.Map.y, object.Map.x + entity.Movement.x, object.Map.y + entity.Movement.y);
			SetEntityPosition(entity.Layer, entity.Map.x, entity.Map.y, entity.Map.x + entity.Movement.x, entity.Map.y + entity.Movement.y);
		}
		else
		{
			entity.Action = "idle";
			entity.Movement.x = 0;
			entity.Movement.y = 0;
		}
	}
	else
	{
		entity.Action = "idle";
		entity.Movement.x = 0;
		entity.Movement.y = 0;
	}
}

function OnTileCollisionSystem(entity, tile)
{
	entity.Action = "idle";
	entity.Movement.x = 0;
	entity.Movement.y = 0;
}

function OnInputSystem(entity, key)
{
	if (key == "up")
	{
		MoveEntity(entity, 0, -1);
	}
	else if (key == "down")
	{
		MoveEntity(entity, 0, 1);
	}
	else if (key == "left")
	{
		MoveEntity(entity, -1, 0);
	}
	else if (key == "right")
	{
		MoveEntity(entity, 1, 0);
	}

	StartSim();
}

function MoveEntity(entity, dx, dy)
{
	entity.Movement.x = dx;
	entity.Movement.y = dy;
	entity.Speed = 1;
	entity.Action = "move";
}