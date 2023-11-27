class WinState{
    constructor(){
        this.toRender;
    }

    enter(toRender){
        this.toRender = toRender;
        gSounds.main.pause();
    }

    /*
    * updates the start state and manages buttons on screen - called every frame
    */
    update(){
        if(keys[13])
            location.reload();
    }

    /*
    * renders the start page
    */
    render(){   
        for(let i = 0; i < this.toRender.length; i++){
            this.toRender[i].render();
        }
        ctx.font = gFonts.large;
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.fillText("You Win!", VIRTUAL_WIDTH/2*SCALE_FACTOR_WIDTH + cameraScroll, VIRTUAL_HEIGHT/3*SCALE_FACTOR_HEIGHT);    
        ctx.font = gFonts.medium;
		ctx.fillText("Press Enter", VIRTUAL_WIDTH/2*SCALE_FACTOR_WIDTH + cameraScroll, VIRTUAL_HEIGHT/2*SCALE_FACTOR_HEIGHT);    
    }
}