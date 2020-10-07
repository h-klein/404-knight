
kontra.init();
kontra.initKeys();

kontra.setImagePath('assets/images');

kontra.load(
    'RR_level.png', 
    'enemy.png', 
    'player.png', 
    'knight1.png').then(
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
      x: 120,
      y: 120,
      // image: kontra.imageAssets['knight1'],
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
        x: 100,
        y: 200,
        image: kontra.imageAssets['enemy'],
        dx: 1.2
      })
    ];

    var direction_last = "idlefront";

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
          if(background.y < 0 && player.y == 120) {
             background.y += 1;
          } else if(player.y > 7){
            player.y -= 1;
          }
          player.playAnimation('walkup');
          direction_last = "idleback";
          pressed = true;
        }
        
        if(kontra.keyPressed('down')) {
          if(background.y > -208 && player.y == 120) {
            background.y -= 1;  
         } else if(player.y < 248){
           player.y += 1;
         }
         player.playAnimation('walkdown');
         direction_last = "idlefront";
         pressed = true;
        }
        
        if(kontra.keyPressed('right')) {
          if(background.x > -208 && player.x == 120) {
            background.x -= 1;  
         } else if(player.x < 251){
           player.x += 1;
         }
         player.playAnimation('walkright');
         direction_last = "idleright";
         pressed = true;
        }
        
        if(kontra.keyPressed('left')) {
          if(background.x < 0 && player.x == 120) {
            background.x += 1;  
         } else if(player.x > 5){
           player.x -= 1;
         }
         player.playAnimation('walkleft');
         direction_last = "idleleft";
         pressed = true;
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
    loop.start();
  }
);
