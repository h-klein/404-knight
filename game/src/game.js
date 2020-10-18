
kontra.init();
kontra.initKeys();

kontra.setImagePath('assets/images');
kontra.setAudioPath('assets/sound');

kontra.load(
    'RR_level.png',
    'enemy.png',
    'knight1.png',
    'testmap.png',
    'cringelivesherenow.mp3').then(
  function(){

    // Knight chracter animations; make into function to apply across other sprites
  const player_knight = kontra.SpriteSheet({
      image: kontra.imageAssets['knight1'],
      frameWidth: 16,
      frameHeight: 16,

    animations: {
      // create a named animations
      idledown: {
        frames: 0,
        loop: false,
      },
      idleup: {
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
        frameRate: 4
      },
      walkup: {
        frames: [4, 1, 7, 1], // which frames to use
        frameRate: 4 // how fast things change
      },
      walkleft: {
        frames: [5,2],
        frameRate: 4
      },
      walkright: {
        frames: [6,9],
        frameRate: 4
      }
    }

  });

  // Level should load in here and change this var
    var background = kontra.Sprite({
      x: -100,
      y: -208,
      image: kontra.imageAssets['testmap']
    });

    // Player character
    var player = kontra.Sprite({
      x: 128,
      y: 128,
      light: 15,
      animations: player_knight.animations,
      anchor: { x: .3, y: .35},
      rotation: 0
    });

    // Enemy sprites (will expand)
    const n_enemies = 4;
    var enemies = [];
    for( i = 0; i < n_enemies; i++){
      enemies.push(
        kontra.Sprite({
          x: 100 + 10*i,
          y: 180 + 10*i,
          image: kontra.imageAssets['enemy'],
          dx: 1
        })
      );
    }

    
    // Light vison blocks
    var canvas_h = 32;
    var canvas_w = 32;
    var chunk_h = 8;
    var chunk_w = 8;

    var fog = [];
    for( h = 0; h < canvas_h; h++){
      for( w = 0; w < canvas_w; w++){
        fog.push(
          kontra.Sprite({
            x: h*chunk_w,
            y: w*chunk_h,
            // required for a rectangle sprite
            width: chunk_w,
            height: chunk_h,
            color: 'black',
            opacity: 1
          })
        );
      }
    }

    // Initial setup of character
    var direction_last = "idledown";

    // Start of frames
    var loop = kontra.GameLoop({
      update: function() {

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

        // Lighting up different areas -- loop through a light source variable eventually (player, torches, fire, etc)
        fog.forEach(function(fog){
          const player_dist_x = Math.abs(player.x - fog.x);
          const player_dist_y = Math.abs(player.y - fog.y);
          const player_dist = Math.sqrt(player_dist_x*player_dist_x + player_dist_y*player_dist_y);

          if(!(player_dist - player.light > 0)) {
            fog.opacity = 0;
          } else if (!(player_dist - 3*player.light > 0)){
            fog.opacity = 1 - player.light/player_dist;
          } else if (!(player_dist - 6*player.light > 0)){
            fog.opacity = .98;
          } else {
            fog.opacity = 1;
          }

          fog.update();

        });

        // Player/map movement
        var pressed = false;

        if(kontra.keyPressed('up')) {
          if(background.y < 0 && player.y == 128) {
            background.y += 1;
          } else if(player.y > 28){
            player.y -= 1;
          }
          player.playAnimation('walkup');
          direction_last = "idleup";
          pressed = true;
        }

        if(kontra.keyPressed('down')) {
          if(background.y > -235 && player.y == 128) {
            background.y -= 1;
         } else if(player.y < 240){ // Edge of maps
           player.y += 1;
         }
         player.playAnimation('walkdown');
         direction_last = "idledown";
         pressed = true;
        }

        if(kontra.keyPressed('right')) {
          if(background.x > -228 && player.x == 128) {
            background.x -= 1;
         } else if(player.x < 243){
           player.x += 1;
         }
         player.playAnimation('walkright');
         direction_last = "idleright";
         pressed = true;
        }

        if(kontra.keyPressed('left')) {
          console.log(background.x, player.x)
          if(background.x < -12 && player.x == 128) {
            background.x += 1;
         } else if(player.x > 7){
           player.x -= 1;
         }
         player.playAnimation('walkleft');
         direction_last = "idleleft";
         pressed = true;
        }

        if(!pressed){
          player.playAnimation(direction_last);
      }

        // Adjust light on player -- for testing
        if(kontra.keyPressed('1') && player.light < 100) {
            player.light = player.light*1.01;
          }
          if(kontra.keyPressed('2') && player.light > 0) {
            player.light = player.light*.99;
          }

          if(kontra.keyPressed('3')) {
            console.log(player.light)
          }


        // Post all changes, update frame
        player.update();
        background.update();

      },


      // Render all assets
      render: function() {
        background.render();
        player.render();
        enemies.forEach(function(enemy){
          enemy.render();
        });
        fog.forEach(function(fog){
          fog.render();
        });
      }
    });

    // Start gamee
    //kontra.audioAssets['cringelivesherenow'].play();
    loop.start();
  }
);
