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
    maxVel: {x: 300, y: 500},
    friction: {x: 3000, y: 100},
    accelGround: 800,
    accelAir: 800,
    jump: 600,
    startPosition: null,

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.setupAnimation();
      this.startPosition = {x: x, y: y};
    },

    setupAnimation: function() {
      this.addAnim('idle', 1, [0]);
      this.addAnim('run', 0.1, [1,2,3]);
      this.addAnim('jump', 1, [4]);
      this.addAnim('fall', 1, [5]);
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
      if (this.vel.y < 0) {
        this.currentAnim = this.anims.jump;
      } else if (this.vel.y > 0) {
        this.currentAnim = this.anims.fall;
      } else if (this.vel.x !== 0) {
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