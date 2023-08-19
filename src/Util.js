/*Generating quads given an atlas and a width and height for the tile by adding
 *a quad in an array for each quad in the atlas
 */
function GenerateQuads(atlas, tileWidth, tileHeight, vWidth, vHeight){
	let sheetWidth = atlas.width;
	let sheetHeight = atlas.height;
	
	let sheetCounter = 0;
	let spriteSheet = [];
	
	for(let y = 0; y < sheetHeight; y+=tileHeight)
	{
		for(let x = 0; x < sheetWidth; x+= tileWidth)
		{
			spriteSheet[sheetCounter] = new Quad(x, y,
			tileWidth, tileHeight, atlas, vWidth, vHeight);
			sheetCounter++;
		}
	}
	return spriteSheet;
}

/*
*Generate multi-tile blocks using the GenerateQuads function and adjust their width and height 
*/
function GenerateTiles(atlas){
	let tileSets = [];
	let setNum = 0;
	for(let i = 0; i < 10; i++){
		for(let j = 0; j < 6; j++){
			let set = [];
			let tileNum = 0;
			for(let k = 0; k < 4; k++){
				for(let m = 0; m < 5; m++){
					set[tileNum] = new Quad(j*80+m*16, i*64+k*16,
						16, 16, atlas, 16, 16);
					tileNum++;
				}
			}
			tileSets[setNum] = set;
			setNum++;
		}
	}
	return tileSets;
}

function GenerateToppers(atlas){
	let tileSets = [];
	let setNum = 0;
	for(let i = 0; i < 18; i++){
		for(let j = 0; j < 6; j++){
			let set = [];
			let tileNum = 0;
			for(let k = 0; k < 4; k++){
				for(let m = 0; m < 5; m++){
					set[tileNum] = new Quad(j*80+m*16, i*64+k*16,
						16, 16, atlas, 16, 16);
					tileNum++;
				}
			}
			tileSets[setNum] = set;
			setNum++;
		}
	}
	return tileSets;
}