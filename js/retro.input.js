// let keynames = ["up", "down", "left", "right"]
// let keycodes = ["w", "s", "a", "d"]

// let KEYPRESS = [];
// let KEYDOWN = [];
// let KEYUP = [];

// let mpos = {x:0, y:0}

// let MOUSEPRESS = false;
// let MOUSEDOWN = false;
// let MOUSEUP = false;

// for (let i = 0; i < keycodes.length; i++) {
// 	KEYPRESS[keynames[i]] = false;
// 	KEYDOWN[keynames[i]] = false;
// 	KEYUP[keynames[i]] = false;
// }

// function ClearKeys() {
// 	for (let i = 0; i < keycodes.length; i++) {
// 		KEYPRESS[keynames[i]] = false;
// 		KEYUP[keynames[i]] = false;
// 	}
// }

// function ClearMouse() {
// 	MOUSEPRESS = false;
// 	MOUSEUP = false;
// }

// window.addEventListener("keydown", function (event) {
// 	if (SIM_PAUSE == true)
// 	{
// 		return;
// 	}

// 	if (event.defaultPrevented) {
// 		return;
// 	}

// 	for (let i = 0; i < keycodes.length; i++) {
// 		if(event.key == keycodes[i]) {
// 			KEYPRESS[keynames[i]] = KEYDOWN[keynames[i]] == false;
// 			KEYDOWN[keynames[i]] = true;
// 		}
// 	}

// 	event.preventDefault();
// }, true);

// window.addEventListener("keyup", function (event) {
// 	if (SIM_PAUSE == true)
// 	{
// 		return;
// 	}

// 	if (event.defaultPrevented) {
// 		return;
// 	}

// 	for (let i = 0; i < keycodes.length; i++) {
// 		if(event.key == keycodes[i]) {
// 			KEYDOWN[keynames[i]] = false;
// 			KEYUP[keynames[i]] = true;
// 		}
// 	}

// 	event.preventDefault();
// }, true);

// function InitInput()
// {
// 	document.getElementById("canvas").addEventListener("mousedown", function (event) {
// 		if (SIM_PAUSE == true)
// 		{
// 			return;
// 		}

// 		if (event.defaultPrevented) {
// 			return;
// 		}

// 		MOUSEPRESS = MOUSEDOWN == false;
// 		MOUSEDOWN = true;
		
// 		mpos.x = Math.floor(event.offsetX / 24);
// 		mpos.y = Math.floor(event.offsetY / 24);

// 		event.preventDefault();
// 	}, true);

// 	document.getElementById("canvas").addEventListener("mouseup", function (event) {
// 		if (SIM_PAUSE == true)
// 		{
// 			return;
// 		}

// 		if (event.defaultPrevented) {
// 			return;
// 		}

// 		MOUSEDOWN = false;
// 		MOUSEUP = true;

// 		event.preventDefault();
// 	}, true);
// }