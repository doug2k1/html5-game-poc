ig.module( 
  'game.main' 
)
.requires(
  'impact.game',
  'game.levels.level0'
)
.defines(function(){

PocGame = ig.Game.extend({
  gravity: 1000,
  // Load a font
  font: new ig.Font( 'media/04b03.font.png' ),
  
  
  init: function() {
    // bind keys
    ig.input.bind(ig.KEY.LEFT_ARROW,  'left');
    ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
    ig.input.bind(ig.KEY.X,           'jump');
    
    // load level
    this.loadLevel(LevelLevel0);
  },
  
  update: function() {
    // screen follows the player
    var player = this.getEntitiesByType(EntityPlayer)[0];

    if (player) {
      this.screen.x = player.pos.x - ig.system.width/2;
      this.screen.y = player.pos.y - ig.system.height/2;

      if (this.screen.x < 0) { this.screen.x = 0; }
    }

    // Update all entities and backgroundMaps
    this.parent();
  },
  
  draw: function() {
    // Draw all entities and backgroundMaps
    this.parent();
  }
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', PocGame, 60, 800, 600, 1 );

});
