let keynames = ["up", "down", "left", "right"]
let keycodes = ["w", "s", "a", "d"]

let KEYPRESS = [];
let KEYDOWN = [];
let KEYUP = [];

for (let i = 0; i < keycodes.length; i++) {
	KEYPRESS[keynames[i]] = false;
	KEYDOWN[keynames[i]] = false;
	KEYUP[keynames[i]] = false;
}

function ClearKeys() {
	for (let i = 0; i < keycodes.length; i++) {
		KEYPRESS[keynames[i]] = false;
		KEYUP[keynames[i]] = false;
	}
}

window.addEventListener("keydown", function (event) {
	if (SIM_PAUSE == true)
	{
		return;
	}

	if (event.defaultPrevented) {
		return;
	}

	for (let i = 0; i < keycodes.length; i++) {
		if(event.key == keycodes[i]) {
			KEYPRESS[keynames[i]] = KEYDOWN[keynames[i]] == false;
			KEYDOWN[keynames[i]] = true;
		}
	}

	event.preventDefault();
}, true);

window.addEventListener("keyup", function (event) {
	if (SIM_PAUSE == true)
	{
		return;
	}

	if (event.defaultPrevented) {
		return;
	}

	for (let i = 0; i < keycodes.length; i++) {
		if(event.key == keycodes[i]) {
			KEYDOWN[keynames[i]] = false;
			KEYUP[keynames[i]] = true;
		}
	}

	event.preventDefault();
}, true);