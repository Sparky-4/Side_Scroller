class PlayState{

    constructor(){
        this.player = new Character();
    }

    enter(params){
        this.player = new Character();
        gSounds.main.load();
        gSounds.main.play();
    }

    update(){
        if(Math.floor((this.player.y+this.player.height)/16) == 9){
            gSounds.vine.load();
            gSounds.galaxy.load();
            gSounds.vine.play();
            gSounds.galaxy.play();
            gStateMachine.change('game_over', [this.player]);
        }
        this.player.update();
        for(let i = 0; i < entities.length; i++){
            entities[i].update();
        }
        gLevelMaker.waterAnim+=SCALE_FACTOR_WIDTH/4;
    }

    render(){
        this.player.render();
        for(let i = 0; i < entities.length; i++){
            entities[i].render();
        }
    }
}