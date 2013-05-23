ig.module(
  'game.entities.player'
)
.requires(
  'impact.entity'
)
.defines(function(){
  EntityPlayer = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/player.png', 64, 128),
    size: {x: 64, y: 128},
    offset: {x: 0, y: 0},
    flip: false,
    maxVel: {x: 400, y: 800},
    friction: {x: 300, y: 0},
    accelGround: 400,
    accelAir: 200,
    jump: 400,
    startPosition: null,

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.setupAnimation();
      this.startPosition = {x: x, y: y};
    },

    setupAnimation: function() {
      this.addAnim('idle', 1, [0]);
      this.addAnim('run', 0.07, [1,2,3]);
    },

    update: function() {
      var accel = this.standing ? this.accelGround : this.accelAir;

      // move left or right
      if (ig.input.state('left')) {
        this.accel.x = -accel;
        this.flip = true;
      } else if (ig.input.state('right')) {
        this.accel.x = accel;
        this.flip = false;
      } else {
        this.accel.x = 0;
      }

      // jump
      if (this.standing && ig.input.pressed('jump')) {
        this.vel.y = -this.jump;
      }

      // set animation
      if (this.vel.x !== 0) {
        this.currentAnim = this.anims.run;
      } else {
        this.currentAnim = this.anims.idle;
      }

      this.currentAnim.flip.x = this.flip;

      // move!
      this.parent();
    }
  });
});