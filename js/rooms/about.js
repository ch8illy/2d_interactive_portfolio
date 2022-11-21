class About
{
    background
    constructor(ctx)
    {
        
        this.background = new Sprite("assets/sprites/rooms/about.png", ctx, "bg", 0, 0);

        this.background.cut({x:0,y:0,w:512,h:372}, 2);
    }
}