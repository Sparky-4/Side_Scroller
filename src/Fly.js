class Fly extends Entity{
    constructor(x, y, width, height){
        super(x, y, width, 12);
        this.state = 1;
        this.type;
        let temp = randInt(1, 4);
        if(temp == 1)
            this.type = 64;
        else if (temp == 2)
            this.type = 67;
        else if (temp == 3)
            this.type = 80;
        else 
            this.type = 83;
        this.dx = CAMERA_SPEED/(20-(temp*2));
        this.anim = new Animation([this.type, this.type+1], 10);
    }

    hitPlayer(player){
        if(this.state < 1)
            return;
        if(player.dy > 0){
            gSounds.kill2.load();
            gSounds.kill2.play();
            this.state--;
            player.score += 200;
            displayScore(this.x + this.width, this.y, 200, 40);
        }
        else{
            gSounds.pipe.load();
            gSounds.pipe.play();
            gSounds.drip.load();
            gSounds.drip.play();
            gStateMachine.change('game_over', [player, this]); 
        }
    }

    down(){
        if(this.y < 64)
            this.y++;
        else
            this.state--;
    }

    update(){
        if(this.state == 1){
            this.x += -this.dx;
        }
        this.anim.update();
    }

    render(){
        if(this.state == 1){
            gFrames.creatures[this.anim.getCurFrame()].draw(this.x*SCALE_FACTOR_WIDTH, (this.y-2)*SCALE_FACTOR_HEIGHT);
        }
        else if(this.state == 0){
            gFrames.creatures[this.type+2].draw(this.x*SCALE_FACTOR_WIDTH, (this.y-2)*SCALE_FACTOR_HEIGHT);
            this.down();
        }
        if(hitboxes)
            ctx.strokeRect(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT, this.width*SCALE_FACTOR_WIDTH, this.height*SCALE_FACTOR_HEIGHT)
    }

}