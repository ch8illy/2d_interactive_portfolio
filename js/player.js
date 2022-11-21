class Player extends Sprite
{
    settings;
    direction = 1;
    frame=0; ticks=0;
    action;
    walk; idle; slide;

    constructor(src, ctx, settings, type, x1, y1)
    {
        super(src, ctx, type, x1, y1, settings);
        this.settings=settings;
        this.walk = this.settings.moves.walk;
        this.idle = this.settings.moves.idle;
        this.slide = this.settings.moves.slide;
    }

    move(acts)
    {
        var idle=true;
        var slide=false;
        if(acts.up)
        {
            this.y = parseInt(this.y)-this.settings.playerSpeed;
            idle=false;    
        }

        if(acts.down)
        {
            this.y = parseInt(this.y)+this.settings.playerSpeed;
            idle=false;
        }

        if(acts.left)
        {
            this.x = parseInt(this.x)-this.settings.playerSpeed;
            this.reversed=true;
            idle=false;
        }

        if(acts.right)
        {
            this.x = parseInt(this.x)+this.settings.playerSpeed;
            this.reversed=false;
            idle=false;
        }

        if(acts.space)
        {
            var x=1;
            if(this.reversed) x=-1;

            this.x = parseInt(this.x)+this.settings.playerSpeed*2*x;
            idle=false;
            slide=true;
        }


        if(idle){
            this.action = this.idle;
        }else if(slide){
            this.action = this.slide;
        }else{
            this.action = this.walk;
        }
        //console.log(this.action);
    }

    render(acts)
    {
        this.move(acts);

        this.slice_ = this.spritePositionToImagePosition(
            this.action[this.frame%this.action.length][0],
            this.action[this.frame%this.action.length][1]
        );

        if(this.ticks%(this.settings.frameLimit) == 0)
        {
            this.frame++;
        }
        this.ticks++;
        this.cut(this.slice_,this.settings.scale);
        
        super.render();
    }

    spritePositionToImagePosition(row, col) {
        return {
            x: (
                col *this.W
            ),
            y: (
                row*this.H
            ),
            w : this.settings.spriteW,
            h : this.settings.spriteH
        }
    }

}
