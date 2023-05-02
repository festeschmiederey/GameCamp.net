let GFX_CANVAS;
let GFX_CTX;
let GFX_TILES;

function InitGraphics(width, height, path) {
	GFX_CANVAS = document.getElementById("canvas");
	GFX_CTX = GFX_CANVAS.getContext("2d");

	GFX_CANVAS.width = width;
	GFX_CANVAS.height = height;

	GFX_TILES = new Image();
	GFX_TILES.src = path;

	GFX_CANVAS.addEventListener("click", function(event) {
		RunSystem("Click", event);
	});
}

function Cls() {
	GFX_CTX.clearRect(0, 0, GFX_CANVAS.width, GFX_CANVAS.height);
}

function DrawTile(id, x, y) {
	GFX_CTX.drawImage(GFX_TILES, id % 16 * 8, Math.floor(id / 16) * 8, 8, 8, x, y, 8, 8);
}