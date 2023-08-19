class Character{
	
	constructor(){
		this.x = VIRTUAL_WIDTH*SCALE_FACTOR_WIDTH / 2 - 16*SCALE_FACTOR_WIDTH;
		this.y = 700 - 20*SCALE_FACTOR_HEIGHT;
        this.dy = 0;
		this.width = 20*SCALE_FACTOR_WIDTH;
		this.height = 25*SCALE_FACTOR_HEIGHT;
        this.idleAnim = new Animation([10], 1);
        this.walkLeftAnim = new Animation([0, 1], 12);
        this.walkRightAnim = new Animation([20, 21], 12);
        this.jumpLeftAnim = new Animation([8], 1);
        this.jumpRightAnim = new Animation([13], 1);
        this.curAnimation = this.idleAnim;
	}
	
	update(){
        this.dy += GRAVITY;
        this.y += this.dy;
        if(this.y > 700 - 20*SCALE_FACTOR_HEIGHT){
            this.y = 700 - 20*SCALE_FACTOR_HEIGHT;
            this.dy = 0;
        }
		if(keys && keys[37]){
			this.x -= CAMERA_SPEED;
            this.curAnimation = this.walkLeftAnim;
        }
		else if (keys && keys[39]){
			this.x += CAMERA_SPEED;
            this.curAnimation = this.walkRightAnim;
        }
        else 
            this.curAnimation = this.idleAnim;
        if(this.dy == 0 && keys && (keys[32] || keys[38])){
            this.dy = -JUMP_SPEED;
        }
        this.curAnimation.update();
	}
	
	render(){
		    gFrames.character[this.curAnimation.getCurFrame()].draw(this.x, this.y);
	}
}