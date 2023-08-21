class StartState{

    constructor(){}

    enter(){}

    /*
    * updates the start state and manages buttons on screen - called every frame
    */
    update(){
        if(keys[13])
			gStateMachine.change('play');
    }

    /*
    * renders the start page
    */
    render(){   
        ctx.font = gFonts.large;
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.fillText("Super Yash Bros.", VIRTUAL_WIDTH/2*SCALE_FACTOR_WIDTH, VIRTUAL_HEIGHT/3*SCALE_FACTOR_HEIGHT);    
        ctx.font = gFonts.medium;
		ctx.fillText("Press Enter", VIRTUAL_WIDTH/2*SCALE_FACTOR_WIDTH, VIRTUAL_HEIGHT/2*SCALE_FACTOR_HEIGHT);    

    }

}