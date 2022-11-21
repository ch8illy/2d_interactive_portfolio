class Sprite
{
    x; y; w; h;
    W; H;
    type;// [bp, p ,ap ,bg]
    ctx; img = new Image();
    loaded = false; reversed = false;
    collision_bx;//{x:,y:,w:,h}
    slice;
    settings;


    constructor(src, ctx, type, x1, y1, settings=null)
    {
        this.img.src = src;
        this.ctx = ctx;
        
        this.img.onload = function()
        {
            this.loaded=true;
        }.bind(this);

        this.x=x1; this.y=y1;
        this.type=type;
        this.settings = settings;

    }

    transform(x,y)
    {
        this.x = x; this.y=y;
    }

    intersectingRect(rect)
    {
        var x=Math.max(this.collision_bx.x,rect.x);
        var y=Math.max(this.collision_bx.y,rect.y);
        var xx=Math.min(this.collision_bx.x+this.collision_bx.w,rect.x+rect.w);
        var yy=Math.min(this.collision_bx.y+this.collision_bx.h,rect.y+rect.h);
        return({x:x,y:y,w:xx-x,h:yy-y});
    }

    intersects(other)
    {
        other = other.collision_bx;
        var r = this.intersectingRect(other);
        if(r.x>0 && r.y>0 && r.w>0 && r.h>0)
        {
            return true;
        }
    }


    cutFromJSON(json_, fname, scale=1)
    {
        json_= JSON.parse(json_);
        this.slice = json_["frame"][fname]["frame"];

        //this.x=coordinates.x; this.y=coordinates.y/scale;
        this.W = slice.w; this.H=slice.h;
        this.w=slice.w*scale; this.h=slice.h*scale;
    }

    cut(slice, scale=1)
    {
        this.slice=slice; this.W = slice.w; this.H=slice.h;
        this.w=slice.w*scale; this.h=slice.h*scale;
    }

    render(N=2)
    {
        if(this.settings !=null)
        {
            this.ctx.rect(this.x, this.y, this.w, this.h);
            this.ctx.arc(this.x, this.y+this.h-this.settings.left_foot_offset, 10, 0, 2 * Math.PI, false);    
        }
        
        this.ctx.stroke();

        if(this.reversed)
        {
            this.ctx.translate(this.x+this.W*N, this.y);
            this.ctx.scale(-1,1);
    
            this.ctx.drawImage(
                this.img,
                this.slice.x,
                this.slice.y,
                this.slice.w,
                this.slice.h,
                0,
                0,
                this.w,
                this.h
            );
    
            this.ctx.setTransform(1,0,0,1,0,0);
        }else{
            //console.log(this.slice);
            this.ctx.drawImage(
                this.img,
                this.slice.x,
                this.slice.y,
                this.slice.w,
                this.slice.h,
    
                this.x,
                this.y,
                this.w,
                this.h
            );
        }

    }

}