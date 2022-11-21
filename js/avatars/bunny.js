class Bunny
{
    settings = {
        spriteW : 50,
        spriteH : 50,
        scale:2.75,
        playerSpeed : 4,
        frameLimit : 10,
        moves : {
            walk : [[0,0], [0,3], [0,4]],
            idle : [[0,0],[0,5]],
            slide :[[3,0],[3,1],[3,2],[3,3],[3,4],[3,5]]
        }
    };

    spritesheet = "assets/sprites/playerspritesheet.png";

    constructor()
    {
        
    }
}