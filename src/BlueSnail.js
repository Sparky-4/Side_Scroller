class BlueSnail extends Entity{
    constructor(x, y, width, height){
        super(x, y, width, height);
        this.min = 0;
        this.max = CAMERA_SPEED/17;
        this.dx = Math.random()*this.max;
        this.dy = 0;
        this.speeding = true;
        this.dir = Math.random()<.5?1:-1;
        this.state = 1;
        this.immune = false;
        this.immuneTime = 0;
        this.player;
    }

    checkFlip(x, y){
        if(this.x < 0)
            return true;
        // Left collsions
        if(gLevelMaker.level[Math.floor(x/16)][Math.floor(y/16)].id > 0 || 
            gLevelMaker.level[Math.floor(x/16)][Math.floor((y+this.height-1)/16)].id > 0 ||
            gLevelMaker.level[Math.floor(x/16)][Math.floor((y+this.height/2)/16)].id > 0 ){
                this.x = Math.ceil(this.x/16)*16;
                return true;
            }

        // Right collisions
        if(gLevelMaker.level[Math.floor((x+this.width)/16)][Math.floor(y/16)].id > 0 || 
            gLevelMaker.level[Math.floor((x+this.width)/16)][Math.floor((y+this.height-1)/16)].id > 0 ||
            gLevelMaker.level[Math.floor((x+this.width)/16)][Math.floor((y+this.height/2)/16)].id > 0){
                if(this.state == -1 && this.dir == 1)
                    this.x = Math.floor(this.x/16)*16 + this.width;
                else
                    this.x = Math.floor(this.x/16)*16;
                return true;
            }

        // Bottom collisions
        if((!gLevelMaker.level[Math.floor((x+1)/16)][Math.floor((y+this.height)/16)].id > 0 || 
            !gLevelMaker.level[Math.floor((x+this.width-1)/16)][Math.floor((y+this.height)/16)].id > 0)){
                if(this.state == -1 && this.dir == 1)
                    this.x = Math.floor(this.x/16)*16 + this.width;
                else
                    this.x = Math.round(this.x/16)*16;
                return true;
            }
        return false;
    }

    hitPlayer(player){
        if(this.state < -1 || this.immune)
            return;
        if(player.dy > 0){
           this.hitShell(player, player);
        }
        else if(this.state == 1 || (!this.immune && this.state == -1)){
            gSounds.death.load();
            gSounds.death2.load();
            gSounds.x.load();
            gSounds.death.play();
            gSounds.death2.play();
            gSounds.x.play();
            gStateMachine.change('game_over', [player, this]); 
        }
        this.player = player;
    }

    hitShell(player, shell){
        if(this.state < -1 || this.immune)
            return;
        gSounds.kill.load();
        gSounds.kill.play();
        if(this.state == 1){
            this.width /= 2;
            this.height /= 2;
            this.x += this.width/2;
            this.y += this.height;
            this.dx = 0;
            if(player){
                player.score += 100;
                displayScore(this.x + this.width, this.y, 100, 40);
            }
        }
        else if(this.state == 0){
            this.dx = CAMERA_SPEED/SCALE_FACTOR_WIDTH*1.5;
            if(shell == player)
                this.dir = shell.x+shell.width/2 > this.x + this.width/2? -1:1;
            else{
                shell.dir *= -1;
                this.dir = -shell.dir;
                shell.x = this.x + shell.width*(shell.x+shell.width/2 < this.x + this.width/2? -1:1);
            }
        }
        else{
            this.dy = -this.dx;
            if(player){
                player.score += 50;
                displayScore(this.x + this.width, this.y, 50, 40);
            }
        }
        this.state--;
        this.immune = true;
        this.immuneTime = 20;
    }

    update(){
        if(this.state == -2){
            this.y += this.dy;
            this.dy += CAMERA_SPEED/50;
            return;
        }
        if(this.immune){
            if(this.immuneTime < 0)
                this.immune = false;
            else
                this.immuneTime--;
        }
        if(this.state == 1){
            if(this.dx < this.max && this.speeding)
                this.dx += .0007*SCALE_FACTOR_WIDTH;
            else if(this.dx > this.min && !this.speeding)
                this.dx -= .0007*SCALE_FACTOR_WIDTH;
            else if(this.dx >= this.max && this.speeding)
                this.speeding = false;
            else if(this.dx <= this.min && !this.speeding)
                this.speeding = true;
        }
        if(this.state == 1 || this.state == -1){
            this.x += this.dx*this.dir;
            if(this.checkFlip(this.x, this.y))
                this.dir *= -1;
        }
        if(this.state == -1){
            for(let i = 0; i < entities.length; i++){
                if(entities[i] != this && entities[i].collides(this)){
                    entities[i].hitShell(this.player, this);
                }
            }
        }
        
    }

    render(){
        if(this.state == 1){
            if(this.dir == 1)
                gFrames.creatures[this.speeding? 107:106].draw(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT);
            else
                gFrames.creatures[this.speeding? 100:101].draw(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT);
        }
        else if(this.state == 0)
            gFrames.creatures[this.dir == 1? 105:102].draw((this.x-this.width/2)*SCALE_FACTOR_WIDTH, (this.y-this.height)*SCALE_FACTOR_HEIGHT);
        else if(this.state <= -1)
            gFrames.creatures[this.dir == 1? 103:104].draw((this.x-this.width/2)*SCALE_FACTOR_WIDTH, (this.y-this.height)*SCALE_FACTOR_HEIGHT);
        if(hitboxes)
            ctx.strokeRect(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT, this.width*SCALE_FACTOR_WIDTH, this.height*SCALE_FACTOR_HEIGHT);
    }

}