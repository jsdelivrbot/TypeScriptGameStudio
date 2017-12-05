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
    * In this level, you play as an angel who must defeat the evil bats
    * who have taken over your skies. Shoot them all down to win.
    */

    // LEVEL 1: the first demo game
    if (index == 1) {

      // Set the gravity of the game
      // Gravity will be 98 pixels per second
      level.resetGravity(0, 98);

      // Add some quality theme music
      level.setMusic("./GameAssets/AngelGame/AngelTheme.mp3");

      // Add a background
      level.drawPicture(0, 0, 960, 540, "./GameAssets/AngelGame/SkyBack.png", -2);

      // Place a box around the arena to limit the play area
      level.drawBoundingBox(0, 0, 960, 540, "", 1, 1, 1);

      // Create a hero and assign it to the variable "h"
      // (Here we explicitly state the type of the variable: "Hero")
      let h: Hero = level.makeHeroAsBox(960/2, 540/2, 48, 48, "./GameAssets/AngelGame/Angel.png");
      // Set strength to 4
      h.setStrength(1);
      // Set 'w' to jump (this involves using keycodes)
      // Find the keycode of any key by going to www.keycode.info
      level.setKeyAction(87, level.JumpAction(h), false);
      // The jumps will give 100 pixels of up velocity
      h.setJumpImpulses(0, 100);
      // Let the hero jump in the air to simulate flying
      h.setMultiJumpOn();

      // 'a' key to move left
      level.setKeyAction(65, level.makeXMotionAction(h, -80), true);
      // 'd' key to move right
      level.setKeyAction(68, level.makeXMotionAction(h, 80), true);

      // Three projectiles at a time, each has 1 power
      level.configureProjectiles(3, 8, 8, "./GameAssets/AngelGame/Bullet.png", 1, 0, false);
      // spacebar to shoot
      //level.setKeyAction(32, level.makeRepeatThrow(h, 1000, 24, 16, 75, 0), true);
      // click to shoot
      level.setClickAction(level.ThrowDirectionalAction(h, 24, 24));
      level.setThrowSound("./GameAssets/AngelGame/Shooting.ogg");
      level.setProjectileVectorDampeningFactor(0.8);
      level.setProjectileRange(200);
      level.setProjectileGravityOn();

      /// Creating the enemies
      // Here we set up an array to make things easier:
      let eArray = new Array<Enemy>();
      eArray[0] = level.makeEnemyAsBox(50, 50, 45, 30, "./GameAssets/AngelGame/Bat.png");
      eArray[1] = level.makeEnemyAsBox(100, 270, 45, 30, "./GameAssets/AngelGame/Bat.png");
      eArray[2] = level.makeEnemyAsBox(500, 120, 45, 30, "./GameAssets/AngelGame/Bat.png");
      eArray[3] = level.makeEnemyAsBox(880, 160, 45, 30, "./GameAssets/AngelGame/Bat.png");
      eArray[4] = level.makeEnemyAsBox(75, 400, 45, 30, "./GameAssets/AngelGame/Bat.png");
      eArray[5] = level.makeEnemyAsBox(820, 380, 45, 30, "./GameAssets/AngelGame/Bat.png");
      eArray[6] = level.makeEnemyAsBox(900, 500, 45, 30, "./GameAssets/AngelGame/Bat.png");

      // Loop through the elements of the array
      for (let e of eArray) {
        e.setDisappearSound("./GameAssets/AngelGame/EnemyKilled.wav");
        // This makes each enemy need to be hit twice to die
        e.setDamage(2);
        // Enemies can fly through each other
        e.setPassThrough(2);
      }

      //eArray[1].setRoute((new Route(3)).to(960/2 - 80, 540/2 + 100).to(960/2 - 80, 540/2 + 50).to(960/2, 540/2).to(960/2 - 80, 540/2 + 100), 50, true)
      //eArray[0].setChaseFixedMagnitude(h, 25, 25, false, false);

      /// Making the cloud obstacles
      // Array for the obstacles
      let oArray = new Array<Obstacle>();
      // Some variables to size them
      let oSize = 48;
      // Cloud 1
      oArray[1] = level.makeObstacleAsCircle(0, 220, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[2] = level.makeObstacleAsCircle(24, 220, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      // Cloud 2
      oArray[3] = level.makeObstacleAsCircle(150, 0, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[4] = level.makeObstacleAsCircle(174, 0, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[5] = level.makeObstacleAsCircle(162, 24, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      // Cloud 3
      oArray[6] = level.makeObstacleAsCircle(512, 24, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[7] = level.makeObstacleAsCircle(524, 0, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[8] = level.makeObstacleAsCircle(536, 24, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      // Cloud 4
      oArray[9] = level.makeObstacleAsCircle(764, 64, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[10] = level.makeObstacleAsCircle(788, 72, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[11] = level.makeObstacleAsCircle(812, 80, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[12] = level.makeObstacleAsCircle(768, 88, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[13] = level.makeObstacleAsCircle(792, 96, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[14] = level.makeObstacleAsCircle(816, 104, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      // Cloud 5
      oArray[15] = level.makeObstacleAsCircle(224, 248, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[16] = level.makeObstacleAsCircle(248, 248, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[17] = level.makeObstacleAsCircle(212, 272, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[18] = level.makeObstacleAsCircle(236, 272, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[19] = level.makeObstacleAsCircle(260, 272, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      // Cloud 6
      oArray[20] = level.makeObstacleAsCircle(512, 324, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[21] = level.makeObstacleAsCircle(536, 324, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[22] = level.makeObstacleAsCircle(524, 348, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[23] = level.makeObstacleAsCircle(548, 348, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      // Cloud 7
      oArray[24] = level.makeObstacleAsCircle(80, 412, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[25] = level.makeObstacleAsCircle(104, 416, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[26] = level.makeObstacleAsCircle(128, 420, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[27] = level.makeObstacleAsCircle(152, 424, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      // Cloud 8
      oArray[28] = level.makeObstacleAsCircle(836, 396, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[29] = level.makeObstacleAsCircle(860, 392, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[30] = level.makeObstacleAsCircle(884, 388, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[31] = level.makeObstacleAsCircle(908, 384, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[32] = level.makeObstacleAsCircle(932, 380, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      // Cloud 9
      oArray[33] = level.makeObstacleAsCircle(756, 508, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[0] = level.makeObstacleAsCircle(780, 508, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");

      // Set the cloud physics
      for (let o of oArray) {
        o.setPhysics(1, 5, 1);
        // So our clouds can be fit together
        o.setPassThrough(1);
      }

      // Must kill all enemies to win
      level.setVictoryEnemyCount(-1);
    }

    // LEVEL 2: This is going to be a platformer game
    else if (index == 2) {
      // Add some quality theme music
      level.setMusic("./GameAssets/ChristmasGame/ChristmasTheme.mp3");

    }

    // LEVEL 3: This is going to be a flappy bird type game
    else if (index == 3) {
      // Add some quality theme music
      level.setMusic("./GameAssets/PlaneGame/PlaneTheme.ogg");
    }
  }
}
