class GameOverState{
    constructor(){
        this.player;
    }

    enter(player){
        this.player = player;
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
        this.player.render();
        ctx.font = gFonts.large;
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.fillText("You Died!", VIRTUAL_WIDTH/2*SCALE_FACTOR_WIDTH + cameraScroll, VIRTUAL_HEIGHT/3*SCALE_FACTOR_HEIGHT);    
        ctx.font = gFonts.medium;
		ctx.fillText("Press Enter", VIRTUAL_WIDTH/2*SCALE_FACTOR_WIDTH + cameraScroll, VIRTUAL_HEIGHT/2*SCALE_FACTOR_HEIGHT);    
    }
}