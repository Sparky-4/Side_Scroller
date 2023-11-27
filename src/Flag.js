class Flag extends Entity{
    constructor(x, y, width, height){
        super(x, y, width, height);
        this.post = randInt(0, 5);
        this.flag = randInt(0, 3);
        this.flagCylce = [this.flag*3, this.flag*3+1]
        this.anim = new Animation(this.flagCylce, 10);
        this.win = false;
        this.flagy = y+4;
    }

    hitPlayer(player){
        gStateMachine.change('win', [player, this]);
        gSounds.win.load();
        gSounds.win.play();
        this.win = true;
        player.win(this.x, this.y+this.height);
    }

    update(){
        this.anim.update();
    }

    down(){
        if(this.flagy < this.y + 32){
            this.flagy++;
        }
    }

    render(){
        gFrames.posts[this.post].draw((this.x-this.width/2)*SCALE_FACTOR_WIDTH, (this.y)*SCALE_FACTOR_HEIGHT);
        if(this.win){
            this.down();
            gFrames.flags[this.win?this.flag*3+2:this.anim.getCurFrame()].draw((this.x+this.width/2)*SCALE_FACTOR_WIDTH, (this.flagy)*SCALE_FACTOR_HEIGHT);
        }
        else 
            gFrames.flags[this.win?this.flag*3+2:this.anim.getCurFrame()].draw((this.x+this.width/2)*SCALE_FACTOR_WIDTH, (this.y+4)*SCALE_FACTOR_HEIGHT);
        if(hitboxes)
            ctx.strokeRect(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT, this.width*SCALE_FACTOR_WIDTH, this.height*SCALE_FACTOR_HEIGHT);
    }

}