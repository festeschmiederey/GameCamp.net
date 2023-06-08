let SIM_STEP = -1;
let SIM_TICK = 8;
let SIM_PAUSE = false;

function InitSim()
{
	const refreshRate = 256 / SIM_TICK;

	RunSystem("SimStart");

	window.setInterval(() => {
		Cls(GFX_CTX);
		RunSystem("Draw", GFX_CTX);
		
		ClearKeys();
		ClearMouse();

		if(SIM_STEP == -1)
		{
			for (let i = 0; i < keycodes.length; i++)
			{
				if(KEYDOWN[keynames[i]] == true)
				{
					RunSystem("Input", keynames[i]);
					break;
				}
			}

			if(MOUSEDOWN == true)
			{
				RunSystem("Mouse", mpos);
			}
		}
	
		if(SIM_STEP != -1)
		{
			if (SIM_STEP == 0)
			{
				RunSystem("SimStart");
			}

			RunSystem("SimLoop", SIM_STEP);

			SIM_STEP++;

			if (SIM_STEP >= SIM_TICK)
			{
				RunSystem("SimEnd");
				SIM_STEP = -1;
			}
		}
	}, refreshRate);
}

function StartSim()
{
	if (SIM_STEP == -1)
	{
		SIM_STEP = 0;
	}
}

function Start()
{
	SIM_PAUSE = false;
}

function Stop()
{
	SIM_PAUSE = true;
}