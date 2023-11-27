class SelectState{

    constructor(){
        this.highlighted = 1;
		this.cooldown = 0;
		this.counter = 10;
        this.levels = [];
        for(let i = 0; i < 25; i++){
            this.levels[i] = i;
        }
    }

    enter(){}

    /*
    * updates the start state and manages buttons on screen - called every frame
    */
    update(){
        if(keys[37] && this.cooldown <= 0){
			this.highlighted--;
			gSounds.empty.play();
			this.cooldown = 10;
		}
        else if(keys[39] && this.cooldown <= 0){
            this.highlighted++;
            gSounds.empty.play();
			this.cooldown = 10;
        }
        else if(keys[38] && this.cooldown <= 0){
            this.highlighted = (25+this.highlighted-5)%this.levels.length;
            gSounds.empty.play();
			this.cooldown = 10;
        }
        else if(keys[40] && this.cooldown <= 0){
            this.highlighted = (this.highlighted+5)%this.levels.length;
            gSounds.empty.play();
			this.cooldown = 10;
        }
        if(this.highlighted == this.levels.length)
            this.highlighted = 0;
        if(this.highlighted == -1)
            this.highlighted = this.levels.length-1;
        if(keys[13] && this.counter <= 0){
            gLevelMaker.loadLevel(this.highlighted);
			gStateMachine.change('play', {});
			gSounds.pickup.play();
		}
        this.cooldown--;
		this.counter--;
    }

    /*
    * renders the start page
    */
    render(){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        ctx.textAlign = 'left';
        ctx.textBaseline = "top";
        for(let i = 0; i < this.levels.length; i++){
            ctx.fillStyle = 'white';
            ctx.font = gFonts.medium;		
            if(this.highlighted == i)
                ctx.fillStyle = '#67ffff';
            ctx.fillText(i, (i%5)*VIRTUAL_WIDTH/5*SCALE_FACTOR_WIDTH+VIRTUAL_WIDTH/15*SCALE_FACTOR_WIDTH,
             Math.floor(i/5)*VIRTUAL_HEIGHT/5*SCALE_FACTOR_HEIGHT+VIRTUAL_HEIGHT/10*SCALE_FACTOR_HEIGHT);
        }
        ctx.textBaseline = "alphabetic";
    }

}