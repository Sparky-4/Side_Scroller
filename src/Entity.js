class Entity {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    collides(other){
        if(this.x > other.x + other.width || this.x + this.width < other.x ||
            this.y > other.y + other.height || this.y + this.height < other.y)
            return false;
        else 
            return true;
    }

    hitPlayer(){}
    update(){}
    render(){}
}