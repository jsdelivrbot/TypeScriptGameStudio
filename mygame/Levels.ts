/// <reference path="../library/ScreenManager.ts"/>

/**
* Levels is where all of the code goes for describing the different levels of
* the game. If you know how to create methods and classes, you're free to make
* the big "if" statement in this code simply call to your classes and methods.
* Otherwise, put your code directly into the parts of the "if" statement.
*/
class Levels implements ScreenManager {

  /**
  * We currently have 94 levels, each of which is described in part of the
  * following function.
  */
  public display(index: number, level: Level): void {
    /*
    * In this level, all we have is a hero (the green ball) who needs to
    * make it to the destination (a mustard colored ball). The game is
    * configured to use tilt to control the level.
    */

    // LEVEL 1: the first demo game
    if (index == 1) {

      // Set the gravity of the game
      level.resetGravity(0, 98);

      // Add some quality theme music
      level.setMusic("./GameAssets/ThemeMusic.mp3");

      // Add a background
      level.drawPicture(0, 0, 960, 640, "./GameAssets/sky1.png", -2);

      // Place a box around the arena to limit the play area
      level.drawBoundingBox(0, 0, 960, 640, "", 1, 1, 1);

      // Create a hero and assign it to the variable "h"
      // (Here we explicitly state the type of the variable: "Hero")
      let h: Hero = level.makeHeroAsBox(960/2, 640/2, 32, 32, "./GameAssets/Angel.png");

      // Set 'w' to jump (this involves using keycode)
      // Find the keycode of any key by going to www.keycode.info
      //level.setKeyAction(32, level.JumpAction(h), false);
      level.setKeyAction(87, level.JumpAction(h), false);
      // The jumps will give 100 pixels of up velocity
      h.setJumpImpulses(0, 100);
      // Let the hero jump in the air to simulate flying
      h.setMultiJumpOn();

      // 'a' key to move left
      level.setKeyAction(65, level.makeXMotionAction(h, -50), true);
      // 'd' key to move right
      level.setKeyAction(68, level.makeXMotionAction(h, 50), true);


      level.configureProjectiles(5, 8, 8, "./GameAssets/Bullet.png", 2, 0, false);
      // spacebar to shoot
      //level.setKeyAction(32, level.makeRepeatThrow(h, 1000, 24, 16, 75, 0), true);
      // click to shoot
      level.setClickAction(level.ThrowDirectionalAction(h, 24, 16));
      level.setThrowSound("./GameAssets/Shooting.ogg");
      level.setProjectileVectorDampeningFactor(0.8);
      //level.setProjectileRange(500);
      level.setProjectileGravityOn();

      let e1: Enemy = level.makeEnemyAsBox(960/2 + 180, 640/2 + 100, 32, 32, "./GameAssets/BatSprite.png")
      let e2: Enemy = level.makeEnemyAsBox(960/2 - 80, 640/2 + 50, 32, 32, "./GameAssets/BatSprite.png")
      let e3: Enemy = level.makeEnemyAsBox(960/2 + 300, 640/2 - 150, 32, 32, "./GameAssets/BatSprite.png")

      e1.setDisappearSound("./GameAssets/EnemyKilled.wav");
      e2.setDisappearSound("./GameAssets/EnemyKilled.wav");
      e3.setDisappearSound("./GameAssets/EnemyKilled.wav");

      e1.setDamage(2);
      e2.setDamage(4);
      e3.setDamage(6);

      e1.setRoute((new Route(3)).to(960/2 - 80, 640/2 + 100).to(960/2 - 80, 640/2 + 50).to(960/2, 640/2).to(960/2 - 80, 640/2 + 100), 50, true)
      e2.setChaseFixedMagnitude(h, 25, 25, false, false);

      let o11: Obstacle = level.makeObstacleAsCircle(500, 500, 32, 32, "./GameAssets/CloudBall.png");
      o11.setPhysics(1, 3, 1);
      o11.setPassThrough(1);
      let o12: Obstacle = level.makeObstacleAsCircle(525, 500, 32, 32, "./GameAssets/CloudBall.png");
      o12.setPhysics(1, 3, 1);
      o12.setPassThrough(1);
      let o13: Obstacle = level.makeObstacleAsCircle(550, 500, 32, 32, "./GameAssets/CloudBall.png");
      o13.setPhysics(1, 3, 1);
      o13.setPassThrough(1);

      let o21: Obstacle = level.makeObstacleAsCircle(200, 200, 32, 32, "./GameAssets/CloudBall.png");
      o21.setPhysics(1, 3, 1);
      o21.setPassThrough(1);
      let o22: Obstacle = level.makeObstacleAsCircle(225, 200, 32, 32, "./GameAssets/CloudBall.png");
      o22.setPhysics(1, 3, 1);
      o22.setPassThrough(1);
      let o23: Obstacle = level.makeObstacleAsCircle(250, 200, 32, 32, "./GameAssets/CloudBall.png");
      o23.setPhysics(1, 3, 1);
      o23.setPassThrough(1);

      // Must kill all enemies
      level.setVictoryEnemyCount(-1);
    }

    // LEVEL 2: This is going to be a platformer game
    else if (index == 2) {

    }

    // LEVEL 3: This is going to be a flappy bird type game
    else if (index == 3) {

    }
  }
}
