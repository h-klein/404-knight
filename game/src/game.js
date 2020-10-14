
kontra.init();
kontra.initKeys();

kontra.setImagePath('assets/images');
kontra.setAudioPath('assets/sound');

kontra.load(
    'RR_level.png',
    'Vision1.png',
    'enemy.png',
    'knight1.png',
    'cringelivesherenow.mp3').then(
  function(){

  const player_knight = kontra.SpriteSheet({
      image: kontra.imageAssets['knight1'],
      frameWidth: 16,
      frameHeight: 16,

    animations: {
      // create a named animations
      idlefront: {
        frames: 0,
        loop: false,
      },
      idleback: {
        frames: 1,
        loop: false,
      },
      idleleft: {
        frames: 2,
        loop: false,
      },
      idleright: {
        frames: 9,
        loop: false,
      },
      walkdown: {
        frames: [3, 0, 8, 0],
        frameRate: 2
      },
      walkup: {
        frames: [4, 1, 7, 1], // which frames to use
        frameRate: 2 // how fast things change
      },
      walkleft: {
        frames: [5,2],
        frameRate: 2
      },
      walkright: {
        frames: [6,9],
        frameRate: 2
      }
    }

  });

    var background = kontra.Sprite({
      x: -100,
      y: -208,
      image: kontra.imageAssets['RR_level']
    });

    var player = kontra.Sprite({
      x: 128,
      y: 128,
      animations: player_knight.animations,
      anchor: { x: .5, y: .5 },
      rotation: 0
    });

    var enemies = [
      kontra.Sprite({
        x: 100,
        y: 180,
        image: kontra.imageAssets['enemy'],
        dx: 1
      }),
      kontra.Sprite({
        x: 100,
        y: 130,
        image: kontra.imageAssets['enemy'],
        dx: 1.8
      }),
      kontra.Sprite({
        x: 100,
        y: 80,
        image: kontra.imageAssets['enemy'],
        dx: 0.8
      }),
      kontra.Sprite({
        x: 0,
        y: 0,
        anchor: {x: 0.5, y: 0.5},
        image: kontra.imageAssets['enemy'],
        dx: 1.2
      })
    ];

    var vision = kontra.Sprite({
        x: -6,
        y: -4,
        anchor: {x: .5, y: .5},
        image: kontra.imageAssets['Vision1']
      });

    var direction_last = "idlefront";

    player.addChild(vision)


    var loop = kontra.GameLoop({
      update: function() {

        player.update();

        //enemy bouncing
        enemies.forEach(function(enemy){
          if(enemy.x < 32) {
            enemy.x = 32;
            enemy.dx = Math.abs(enemy.dx);
          }

          else if(enemy.x > 200) {
            enemy.x = 200;
            enemy.dx = -Math.abs(enemy.dx);
          }

          enemy.update();

        });

        var pressed = false;

        if(kontra.keyPressed('up')) {
          if(background.y < 0 && player.y == 128) {
            background.y += 1;
          } else if(player.y > 7){
            player.y -= 1;
          }
          player.playAnimation('walkup');
          direction_last = "idleback";
          pressed = true;
        }

        if(kontra.keyPressed('down')) {
          if(background.y > -208 && player.y == 128) {
            background.y -= 1;
         } else if(player.y < 248){ // Edge of maps
           player.y += 1;
         }
         player.playAnimation('walkdown');
         direction_last = "idlefront";
         pressed = true;
        }

        if(kontra.keyPressed('right')) {
          if(background.x > -208 && player.x == 133) {
            background.x -= 1;
         } else if(player.x < 251){
           player.x += 1;
         }
         player.playAnimation('walkright');
         direction_last = "idleright";
         pressed = true;
        }

        if(kontra.keyPressed('left')) {
          if(background.x < 0 && player.x == 133) {
            background.x += 1;
         } else if(player.x > 5){
           player.x -= 1;
         }
         player.playAnimation('walkleft');
         direction_last = "idleleft";
         pressed = true;
        }

        if(kontra.keyPressed('1') && vision.scaleX < 1) {
            vision.scaleX = vision.scaleX*1.01;
            vision.scaleY = vision.scaleY*1.01;
          }
          if(kontra.keyPressed('2') && vision.scaleX > .1775) {
            vision.scaleX = vision.scaleX*.99;
            vision.scaleY = vision.scaleY*.99;
          }

          if(kontra.keyPressed('3')) {
            console.log(vision.scaleX)
            console.log(vision.scaleY)
          }

        if(!pressed){
            player.playAnimation(direction_last);
        }

        player.update();
        background.update();


      },
      render: function() {
        background.render();
        player.render();
        enemies.forEach(function(enemy){
          enemy.render();
        });
      }
    });
    player.playAnimation('idleback');
    kontra.audioAssets['cringelivesherenow'].play();
    loop.start();
  }
);
