kontra.init();

kontra.assetPaths.images = 'assets/images/';

kontra.loadAssets('background.png', 'enemy.png', 'player.png').then(
  function(){
    var background = kontra.sprite({
      x: 0,
      y: 0,
      image: kontra.images.background
    });

    var player = kontra.sprite({
      x: 120,
      y: 240,
      image: kontra.images.player
    });

    var enemies = [
      kontra.sprite({
        x: 100,
        y: 180,
        image: kontra.images.enemy,
        dx: 1
      }),
      kontra.sprite({
        x: 100,
        y: 130,
        image: kontra.images.enemy,
        dx: 1.8
      }),
      kontra.sprite({
        x: 100,
        y: 80,
        image: kontra.images.enemy,
        dx: 0.8
      }),
      kontra.sprite({
        x: 100,
        y: 200,
        image: kontra.images.enemy,
        dx: 1.2
      })
    ];

    var loop = kontra.gameLoop({
      update: function() {

        if(kontra.keys.pressed('up')) {
          player.y -= 1;
        }

        if(kontra.keys.pressed('down')) {
          player.y += 1;
        }

        if(kontra.keys.pressed('right')) {
          player.x += 1;
        }

        if(kontra.keys.pressed('left')) {
          player.x -= 1;
        }

        if(player.y <= 40) {
          //pause game
          loop.stop();
          alert('You Won!');
          window.location = '';
        }
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

          //check for collision
          if(enemy.collidesWith(player)) {
            loop.stop();
            alert('GAME OVER!');
            window.location = '';
          }
        });

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

    loop.start();

  }
);
