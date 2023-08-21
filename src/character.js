class Character{
	
	constructor(){
		this.x = 0;
		this.y = 0;
        this.dy = 0;
		this.width = 16;
		this.height = 20;
        this.animations = {
            idle: new Animation([10], 60),
            walkLeft: new Animation([0, 1], 10),
            walkRight: new Animation([20, 21], 10),
            jumpLeft: new Animation([8], 1),
            jumpRight: new Animation([13], 1),
            fallLeft: new Animation([3], 1),
            fallRight: new Animation([18], 1),
        };        
        this.curAnimation = this.animations.idle;
	}

    collides(x, y){
        let collisions = {
            top: false,
            bottom: false,
            left: false,
            right: false,
        }
        if(y < 0 || Math.floor((y+this.height)/16) == 9)
            return collisions;
        if(x <= 0)
            collisions.left = true;

        // Left collisions
        else if(gLevelMaker.level[Math.floor(x/16)][Math.floor(y/16)].id > 0 || 
            gLevelMaker.level[Math.floor(x/16)][Math.floor((y+this.height-1)/16)].id > 0 ||
            gLevelMaker.level[Math.floor(x/16)][Math.floor((y+this.height/2)/16)].id > 0 )
                collisions.left = true;

        // Right collisions
        if(gLevelMaker.level[Math.floor((x+this.width)/16)][Math.floor(y/16)].id > 0 || 
            gLevelMaker.level[Math.floor((x+this.width)/16)][Math.floor((y+this.height-1)/16)].id > 0 ||
            gLevelMaker.level[Math.floor((x+this.width)/16)][Math.floor((y+this.height/2)/16)].id > 0)
                collisions.right = true;

        // Top collisions
        if(this.dy < 0 && 
            (gLevelMaker.level[Math.floor((x+1)/16)][Math.floor(y/16)].id > 0 || 
            gLevelMaker.level[Math.floor((x+this.width-1)/16)][Math.floor(y/16)].id > 0))
                collisions.top = true;

        // Bottom collisions
        if((gLevelMaker.level[Math.floor((x+1)/16)][Math.floor((y+this.height)/16)].id > 0 || 
            gLevelMaker.level[Math.floor((x+this.width-1)/16)][Math.floor((y+this.height)/16)].id > 0))
                collisions.bottom = true;

        return collisions;
    }

    handleMovement(){
        // Verticle movement
        this.y += this.dy;
        if(!this.collides(this.x, this.y).bottom)
            this.dy += GRAVITY/SCALE_FACTOR_HEIGHT;
        else{
            this.dy = 0;
            this.y = Math.floor((this.y+this.height)/16)*16 - this.height;
        }
        if(this.dy == 0 && (keys[32] || keys[38])){
                this.dy = -JUMP_SPEED/SCALE_FACTOR_HEIGHT;
        }
        if(this.collides(this.x, this.y).top){
            this.y = Math.floor((this.y)/16)*16 + this.height;
            this.dy *= -1;
        }


        // Horizontal movement
        if(keys[37] && this.x > 0){
			this.x -= CAMERA_SPEED/SCALE_FACTOR_WIDTH;
            this.curAnimation = this.dy==0? this.animations.walkLeft: this.dy<0? this.animations.jumpLeft: this.animations.fallLeft;
            let adjust = 0;
            if(this.collides(this.x, this.y).left){
                adjust = Math.ceil(this.x/16)*16-this.x;
                this.x = Math.ceil(this.x/16)*16;
            }
            if(this.x > VIRTUAL_WIDTH/2 - 8){
                ctx.translate(CAMERA_SPEED-adjust*SCALE_FACTOR_WIDTH, 0);
                cameraScroll -= CAMERA_SPEED-adjust*SCALE_FACTOR_WIDTH;
            }
        }
		else if (keys[39]){
			this.x += CAMERA_SPEED/SCALE_FACTOR_WIDTH;
            this.curAnimation = this.dy==0? this.animations.walkRight: this.dy<0? this.animations.jumpRight: this.animations.fallRight;
            let adjust = 0;
            if(this.collides(this.x, this.y).right){
                adjust = this.x-Math.floor(this.x/16)*16;
                this.x = Math.floor(this.x/16)*16;
            }
            if(this.x > VIRTUAL_WIDTH/2 - 8){
                ctx.translate(-CAMERA_SPEED+adjust*SCALE_FACTOR_WIDTH, 0);
                cameraScroll += CAMERA_SPEED-adjust*SCALE_FACTOR_WIDTH;
            }
            
        }
        else 
            this.curAnimation = this.animations.idle;
    }

	update(){
        this.handleMovement();
        this.curAnimation.update();
	}
	
	render(){
		    gFrames.character[this.curAnimation.getCurFrame()].draw(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT);
            if(hitboxes)
                ctx.strokeRect(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT, this.width*SCALE_FACTOR_WIDTH, this.height*SCALE_FACTOR_HEIGHT)
	}
}