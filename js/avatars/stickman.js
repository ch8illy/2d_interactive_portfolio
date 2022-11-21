class StickMan
{
    settings = {
        spriteW : 32,
        spriteH : 63.5,
        scale: 3,
        playerSpeed : 5,
        frameLimit : 10,
        moves : {
            walk : [[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8]],
            idle : [[0,0]],
            slide :[[3,0],[3,1],[3,2],[3,3],[3,4],[3,5]]
        },
        left_foot_offset : 15
    };

    spritesheet = "assets/sprites/stickfigure/spritesheet.png";

    constructor()
    {
        
    }
}