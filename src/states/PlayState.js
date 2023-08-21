class PlayState{

    constructor(){
        this.player = new Character();
    }

    enter(params){
        this.player = new Character();
    }

    update(){
        if(Math.floor((this.player.y+this.player.height)/16) == 9){
            gStateMachine.change('game_over', this.player);
        }
        this.player.update();
    }

    render(){
        this.player.render();
    }
}