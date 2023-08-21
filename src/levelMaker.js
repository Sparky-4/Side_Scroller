class LevelMaker{
    constructor(){
        this.level = [];
        this.waterAnim = 0;
    }

    generateLevel(){
        for(let i = 0; i < 200; i++){
            let col = [];
            for(let j = 0; j < 9; j++){
                col[j] = {
                    id: 0,
                    topper: false
                };
            }
            this.level[i] = col;
        }
        for(let i = 0; i < 100; i++){
            //chasms
            if(randInt(1, 7) == 1 && i != 0)
                continue;
            //flags
            let pillerFlag = false;
            let block1Flag = false;
            let block2Flag = false;
            if(randInt(1, 5) == 1)
                pillerFlag = true;
            else if(randInt(1,5) == 1)
                block1Flag = true;
            else if(randInt(1,5) == 1)
                block2Flag = true;

            //Generate block
            for(let j = 0; j < 9; j++){
                if(j >= 7 || (pillerFlag && j >= 5))
                    this.level[i][j].id = 1;
                if((pillerFlag && j == 5) || (!pillerFlag && j == 7))
                    this.level[i][j].topper = true;
                if(block1Flag && j == 4)
                    this.level[i][j].id = 2;
                if(block2Flag && j == 4)
                    this.level[i][j].id = 3;
            }
        }
        this.makeEnemies();
    }

    makeEnemies(){
        for(let i = 0; i < this.level.length-3; i++){
            if(this.level[i][6].id == 0 && this.level[i+1][6].id == 0 && this.level[i+2][6].id == 0 &&
                this.level[i][7].id == 1 && this.level[i+1][7].id == 1 && this.level[i+2][7].id == 1){
                entities.push(new Snail(randInt(i, i+2)*16, 96, 16, 16));
                i+=2;
            }
        }
    }

    drawLevel(){
        for(let i = 0; i < 100; i++){
            for(let j = 0; j < 9; j++){
                 // Render water
                 if(j == 8)
                    gFrames.water[2].draw((i*16*SCALE_FACTOR_WIDTH+this.waterAnim)%(16*SCALE_FACTOR_WIDTH*100), ((j*16)-4)*SCALE_FACTOR_HEIGHT);
            }
        }
        
        for(let i = 0; i < 100; i++){
            for(let j = 0; j < 9; j++){
                // Render all the blocks
                if(this.level[i][j].id == 1)
                    gFrames.tiles[tileSet][12].draw(i*16*SCALE_FACTOR_WIDTH, j*SCALE_FACTOR_HEIGHT*16);
                if(this.level[i][j].id == 2)
                    gFrames.jump_blocks[0].draw(i*16*SCALE_FACTOR_WIDTH, j*SCALE_FACTOR_HEIGHT*16);
                if(this.level[i][j].id == 3)
                    gFrames.jump_blocks[17].draw(i*16*SCALE_FACTOR_WIDTH, j*SCALE_FACTOR_HEIGHT*16);

                // Render all toppers
                if(this.level[i][j].topper)
                    gFrames.toppers[topperSet][2].draw(i*16*SCALE_FACTOR_WIDTH, j*SCALE_FACTOR_HEIGHT*16);
            }
        }
    }

}