class Game
{
    settings = {};
    assets = [];
    acts = {};
    frame = 0;
    room;
    canvas; ctx;

    constructor()
    {
        this.canvas=document.querySelector('canvas');
        this.ctx = this.canvas.getContext("2d");
        var htmlElement = document.documentElement;
        var bodyElement = document.body;

        this.canvas.width = Math.max(
            htmlElement.clientWidth, htmlElement.scrollWidth, htmlElement.offsetWidth,
            bodyElement.scrollWidth, bodyElement.offsetWidth
        );
        this.canvas.height = Math.max(
            htmlElement.clientHeight, htmlElement.scrollHeight, htmlElement.offsetHeight,
            bodyElement.scrollHeight, bodyElement.offsetHeight
        );
        //this.canvas.width=432*3;
        //this.canvas.height = 245*3;
        document.body.appendChild(this.canvas);

        this.constants_setup();

        this.rooms();
        this.init_();
    }

    rooms()
    {
        // var background = new Sprite("assets/sprites/garden_bg.png", this.ctx, "bg", 0, 0);
        // background.cut({x:0,y:0,w:432*3,h:245*3}, 3);
        // this.assets.push(background);
        this.room = new About(this.ctx);
        this.assets.push(this.room.background);

        var bunny = new Bunny();
        var stickman = new StickMan();

        var avatar = stickman;
        var player = new Player(avatar.spritesheet,this.ctx,avatar.settings,"p",200,200);
        this.assets.push(player);
    }

    constants_setup()
    {
        this.settings.playerSpeed = 3;
        this.settings.walls = true;
        this.settings.automatic = false;
        this.settings.godmode = false;

        this.acts.up = false;
        this.acts.down = false;
        this.acts.left = false;
        this.acts.right = false;
        this.acts.space = false;
        this.acts.e = false;
    }

    render()
    {
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();

        var interqueue = [];

        var queue =
        {
            bp : [],
            p : null,
            ap : [],
            bg : []
        } 

        for(var i=0; i<this.assets.length; i++)
        {
            switch(this.assets[i].type)
            {
                case "bp":
                    queue.bp.push(this.assets[i]);
                    break;
                case "p":
                    queue.p = this.assets[i];
                    break;
                case "ap":
                    queue.ap.push(this.assets[i]);
                    break;
                case "bg":
                    
                    queue.bg.push(this.assets[i]);
                    break;
                default:
                    break;
            }
        }
        
        for(var i=0; i<queue.bg.length; i++)
        {
            queue.bg[i].render();
        }

        for(var i=0; i<queue.ap.length; i++)
        {
            queue.ap[i].render();
            if(queue.p.intersects(queue.ap[i]))
            {
                interqueue.push(queue.ap[i]);
            }

        }

        queue.p.render(this.acts);
        

        for(var i=0; i<queue.bp.length; i++)
        {
            queue.bp[i].render();

            if(queue.p.intersects(queue.bp[i]))
            {
                interqueue.push(queue.bp[i]);
            }

        }
    }


    init_()
    {
        var request; 

        window.requestAnimFrame = (function(){
            return window.requestAnimationFrame          ||
                    window.webkitRequestAnimationFrame   ||
                    window.mozRequestAnimationFrame      ||
                    function(callback)
                    {
                        window.setTimeout(callback, 1000/60); //60fps
                    };
        
        }).bind(window)();

        window.cancelRequestAnimFrame = (function(){
            return window.cancelAnimationFrame              ||
                window.webkitCancelRequestAnimationFrame    ||
                window.mozCancelRequestAnimationFrame       ||
                window.oCancelRequestAnimationFrame         ||
                window.msCancelRequestAnimationFrame        ||
                clearTimeout
        }).bind(window)();


        var loop = function()
        {
            this.render();
            request = window.requestAnimFrame(loop);
            this.frame++;

        }.bind(this);

        
        loop();
        this.setupEvents();
        
    }

    setupEvents()  
    {
        document.addEventListener('keyup', function(event){
            var keyName = event.key;
            switch(keyName) {
              case "d":
                  this.acts.right = false;
                  break;
              case "a":
                  this.acts.left = false;
                  break;
              case "w":
                  this.acts.up = false;
                  break;
              case "s":
                  this.acts.down = false;
                  break;
              case "ArrowRight":
                  this.acts.right = false;
                  break;
              case "ArrowLeft":
                  this.acts.left = false;
                  break;
              case "ArrowUp":
                  this.acts.up = false;
                  break;
              case "ArrowDown":
                  this.acts.down = false;
                  break;
              case " ":
                  this.acts.space = false;
                  break;
              case "e":
                  this.acts.e = false;
                  break;
              default:
                  break;
            }
        }.bind(this));
    
        document.addEventListener('keydown', function(event){
            var keyName = event.key;
            switch(keyName) {
              case "d":
                  this.acts.right = true;
                  break;
              case "a":
                  this.acts.left = true;
                  break;
              case "w":
                  this.acts.up = true;
                  break;
              case "s":
                 this.acts.down = true;
                  break;
              case "ArrowRight":
                  this.acts.right = true;
                  break;
              case "ArrowLeft":
                  this.acts.left = true;
                  break;
              case "ArrowUp":
                  this.acts.up = true;
                  break;
              case "ArrowDown":
                 this.acts.down = true;
                  break;
              case " ":
                  this.acts.space = true;
                  break;
              case "e":
                  this.acts.e = true;
                  break;
              default:
                break;

            }
        }.bind(this));
    }

}

var g = new Game();
