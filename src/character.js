class Character{
	
	constructor(){
		this.x = 0;
		this.y = 76;
        this.dy = 0;
		this.width = 16;
		this.height = 20;
        this.animations = {
            idle: new Animation([10], 60),
            walkLeft: new Animation([0, 1], 12),
            walkRight: new Animation([20, 21], 12),
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
        if(y < 0)
            return collisions;
        if(x <= 0)
            collisions.left = true;
        else if(level[Math.floor(x/16)][Math.floor(y/16)].id > 0 || 
            level[Math.floor(x/16)][Math.floor((y+this.height-1)/16)].id > 0)
                collisions.left = true;
        else
            collisions.left = false;
        if(level[Math.floor((x+this.width)/16)][Math.floor(y/16)].id > 0 || 
            level[Math.floor((x+this.width)/16)][Math.floor((y+this.height-1)/16)].id > 0)
                collisions.right = true;
        else 
            collisions.right = false;
        if(this.dy < 0 && 
            (level[Math.floor((x+1)/16)][Math.floor(y/16)].id > 0 || 
            level[Math.floor((x+this.width-1)/16)][Math.floor(y/16)].id > 0))
                collisions.top = true;
        else
            collisions.top = false;
        if((level[Math.floor((x+1)/16)][Math.floor((y+this.height)/16)].id > 0 || 
            level[Math.floor((x+this.width-1)/16)][Math.floor((y+this.height)/16)].id > 0))
                collisions.bottom = true;
        else 
            collisions.bottom = false;
        return collisions;
    }
	
    handleCollisions(){
        let collisions = this.collides(this.x, this.y);
        if(collisions.bottom){
            this.y = Math.floor((this.y+this.height)/16)*16 - this.height;
            collisions = this.collides(this.x, this.y);
        }
        if(collisions.left){
            this.x = Math.ceil(this.x/16)*16
            collisions = this.collides(this.x, this.y);
        }
        if(collisions.right){
            this.x = Math.floor(this.x/16)*16
            collisions = this.collides(this.x, this.y);
        }
    }

    handleMovement(){
        if(keys[37] && !this.collides(this.x - CAMERA_SPEED/SCALE_FACTOR_WIDTH, this.y).left){
			this.x -= CAMERA_SPEED/SCALE_FACTOR_WIDTH;
            if(this.x > VIRTUAL_WIDTH/2 - 16){
                ctx.translate(CAMERA_SPEED, 0);
                cameraScroll -= CAMERA_SPEED;
            }
            this.curAnimation = this.dy==0? this.animations.walkLeft: this.dy<0? this.animations.jumpLeft: this.animations.fallLeft;
        }
		else if (keys[39] && !this.collides(this.x + CAMERA_SPEED/SCALE_FACTOR_WIDTH, this.y).right){
			this.x += CAMERA_SPEED/SCALE_FACTOR_WIDTH;
            if(this.x > VIRTUAL_WIDTH/2 - 16){
                ctx.translate(-CAMERA_SPEED, 0);
                cameraScroll += CAMERA_SPEED;
            }
            this.curAnimation = this.dy==0? this.animations.walkRight: this.dy<0? this.animations.jumpRight: this.animations.fallRight;
        }
        else 
            this.curAnimation = this.animations.idle;

        if(!this.collides(this.x, this.y).bottom)
            this.dy += GRAVITY/SCALE_FACTOR_HEIGHT;
        else
            this.dy = 0;
        if(this.dy == 0 && (keys[32] || keys[38])){
                this.dy = -JUMP_SPEED/SCALE_FACTOR_HEIGHT;
        }
        this.y += this.dy;
    }

	update(){
        this.handleMovement();
        this.handleCollisions();
        this.curAnimation.update();
	}
	
	render(){
		    gFrames.character[this.curAnimation.getCurFrame()].draw(this.x*SCALE_FACTOR_WIDTH, this.y*SCALE_FACTOR_HEIGHT);
	}
}