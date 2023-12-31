class Snail extends Entity{
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
        this.immuneTime = 30;
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
                this.x = Math.floor(this.x/16)*16;
                return true;
            }

        // Bottom collisions
        if((!gLevelMaker.level[Math.floor((x+1)/16)][Math.floor((y+this.height)/16)].id > 0 || 
            !gLevelMaker.level[Math.floor((x+this.width-1)/16)][Math.floor((y+this.height)/16)].id > 0)){
                this.x = Math.round(this.x/16)*16;
                return true;
            }
        return false;
    }

    hitPlayer(player){
        if(this.state < -1 || this.immune)
            return;
        if(player.dy > 0){
            this.hitShell(player);
        }
        else if(this.state == 1){
            gSounds.death.load();
            gSounds.death2.load();
            gSounds.x.load();
            gSounds.death.play();
            gSounds.death2.play();
            gSounds.x.play();
            gStateMachine.change('game_over', [player, this]); 
        }
    }

    hitShell(player){
        if(this.state < -1 || this.immune)
            return;
        gSounds.kill.load();
        gSounds.kill.play();
        if(this.state == 1){
            this.width /= 2;
            this.height /= 2;
            this.x += this.width/2;
            this.y += this.height;
        }
        else 
            this.dy = -CAMERA_SPEED/SCALE_FACTOR_WIDTH*1.5;
        this.immune = true;
        this.state--;
        if(player){
            player.score += this.state==0?100:50;
            displayScore(this.x + this.width, this.y, this.state==0?100:50, 40);
        }
    }

    update(){
        if(this.state == -1){
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
            this.x += this.dx*this.dir;
            if(this.checkFlip(this.x, this.y))
                this.dir *= -1;
        }
    }

    render(){
        if(this.state == 1){
            if(this.dir == 1)
                gFrames.creatures[this.speeding? 111:110].draw(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT);
            else
                gFrames.creatures[this.speeding? 96:97].draw(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT);
        }
        else if(this.state == 0)
            gFrames.creatures[this.dir == 1? 109:98].draw((this.x-this.width/2)*SCALE_FACTOR_WIDTH, (this.y-this.height)*SCALE_FACTOR_HEIGHT);
        else if(this.state == -1)
            gFrames.creatures[this.dir == 1? 108:99].draw((this.x-this.width/2)*SCALE_FACTOR_WIDTH, (this.y-this.height)*SCALE_FACTOR_HEIGHT);
        if(hitboxes)
            ctx.strokeRect(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT, this.width*SCALE_FACTOR_WIDTH, this.height*SCALE_FACTOR_HEIGHT);
    }

}