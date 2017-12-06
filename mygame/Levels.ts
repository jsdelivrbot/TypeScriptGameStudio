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
     * LEVEL 1: the first demo game
     * In this level, you play as an angel who must defeat the evil bats who have
     * taken over your skies. Drop pebbles on them all to defeat them and win.
     */
    if (index == 1) {
      // Set the gravity of the game
      level.resetGravity(0, 90);
      // Add some quality theme music
      level.setMusic("./GameAssets/AngelGame/AngelTheme.mp3");
      // Add a background
      level.drawPicture(0, 0, 960, 540, "./GameAssets/AngelGame/SkyBack.png", -2);
      // Place a box around the arena to limit the play area
      level.drawBoundingBox(0, 0, 960, 540, "", 1, 1, 1);

      // Create a hero and assign it to the variable "h"
      // (Here we explicitly state the type of the variable: "Hero")
      let h: Hero = level.makeHeroAsBox(600, 400, 48, 48, "./GameAssets/AngelGame/Angel.png");
      h.setStrength(1);
      // Set 'w' to jump (this involves using keycodes)
      // Find the keycode of any key by going to www.keycode.info
      level.setKeyAction(87, level.jumpAction(h, 500), null, true);
      // The sets the velocity of a jump
      h.setJumpImpulses(0, 120);
      // Let the hero jump in the air to simulate flying
      h.setMultiJumpOn();
      // 'a' key to move left
      level.setKeyAction(65, level.makeXMotionAction(h, -50), null, true);
      // 'd' key to move right
      level.setKeyAction(68, level.makeXMotionAction(h, 50), null, true);

      // Three projectiles at a time, each has 1 power
      level.configureProjectiles(10, 8, 8, "./GameAssets/AngelGame/Bullet.png", 1, 0, false);
      // spacebar to shoot
      level.setKeyAction(32, level.makeRepeatThrow(h, 800, 24, 24, 0, 10), null, true);
      // click to shoot
      //level.setFixedVectorThrowVelocityForProjectiles(150);
      //level.setClickAction(level.ThrowDirectionalAction(h, 24, 24));
      level.setThrowSound("./GameAssets/AngelGame/Shooting.ogg");
      //level.setProjectileVectorDampeningFactor(0.5);
      level.setProjectileRange(540);
      level.setProjectileGravityOn();

      /// Creating the enemies
      // Here we set up an array to make things easier:
      let eArray = new Array<Enemy>();
      eArray[0] = level.makeEnemyAsBox(50, 50, 45, 30, "./GameAssets/AngelGame/Bat.png");
      eArray[1] = level.makeEnemyAsBox(100, 270, 45, 30, "./GameAssets/AngelGame/Bat.png");
      eArray[2] = level.makeEnemyAsBox(500, 120, 45, 30, "./GameAssets/AngelGame/Bat.png");
      eArray[3] = level.makeEnemyAsBox(850, 210, 45, 30, "./GameAssets/AngelGame/Bat.png");
      eArray[4] = level.makeEnemyAsBox(350, 170, 45, 30, "./GameAssets/AngelGame/Bat.png");
      eArray[5] = level.makeEnemyAsBox(650, 350, 45, 30, "./GameAssets/AngelGame/Bat.png");

      // Loop through the elements of the array
      for (let e of eArray) {
        e.setDisappearSound("./GameAssets/AngelGame/EnemyKilled.wav");
        // This makes each enemy need to be hit once to die
        e.setDamage(1);
        // Enemies can fly through each other
        e.setPassThrough(2);
      }

      // Three of the enemies chase the hero
      eArray[0].setChaseFixedMagnitude(h, 25, 25, false, false);
      eArray[1].setChaseFixedMagnitude(h, 35, 35, false, false);
      eArray[5].setChaseFixedMagnitude(h, 15, 15, false, false);

      // While the other three follow a set route
      eArray[2].setRoute((new Route(4)).to(500, 120)
                                      .to(550, 250)
                                      .to(800, 300)
                                      .to(500, 120), 40, true);
      eArray[3].setRoute((new Route(7)).to(850, 210)
                                      .to(710, 430)
                                      .to(150, 380)
                                      .to(120, 200)
                                      .to(300, 100)
                                      .to(400, 250)
                                      .to(850, 210), 50, true);
      eArray[4].setRoute((new Route(5)).to(350, 170)
                                      .to(380, 250)
                                      .to(330, 410)
                                      .to(370, 220)
                                      .to(350, 170), 40, true);

      /// Making the cloud obstacles
      // Array for the obstacles
      let oArray = new Array<Obstacle>();
      // Some variables to size them
      let oSize = 48;
      // Cloud 1
      oArray[0] = level.makeObstacleAsCircle(0, 220, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[1] = level.makeObstacleAsCircle(24, 220, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[2] = level.makeObstacleAsCircle(48, 220, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
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
      oArray[33] = level.makeObstacleAsCircle(700, 508, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
      oArray[34] = level.makeObstacleAsCircle(724, 508, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");

      // Set the cloud physics
      for (let o of oArray) {
        o.setPhysics(1, 5, 1);
        // So our clouds can be fit together
        o.setPassThrough(1);
      }

      // Player loses if the bats aren't defeated within 3 minutes
      level.setLoseCountdown(180);
      // Add a display for the timer
      level.addDisplay(25, 25, "Arial", "0x000000", 24, "Time Remaining: ", "", level.DisplayLoseCountdown(), 0);
      // Must kill all enemies to win
      level.setVictoryEnemyCount(-1);
    }

    /*
     * LEVEL 2: This is a platformer game
     * You are a cold hearted robot who only cares about money
     * Santas are your enemies, their jolly-ness will kill you
     * Collect all the coins and reach the end to win.
     */
    else if (index == 2) {
      // Add some quality theme music
      level.setMusic("./GameAssets/ChristmasGame/ChristmasTheme.mp3");
      // Zoom in
      level.setZoom(0.3);

      // Set the gravity of the game
      level.resetGravity(0, 85);

      level.drawPicture(16, 356, 16, 16, "./GameAssets/ChristmasGame/ArrowSign.png", -1);

      // Add a background
      level.drawPicture(0, 0, 960, 540, "./GameAssets/ChristmasGame/ChristmasBack.png", -2);
      level.drawPicture(960, 0, 960, 540, "./GameAssets/ChristmasGame/ChristmasBack.png", -2);
      // Create a hero
      let robot: Hero = level.makeHeroAsBox(32, 300, 16, 28, "./GameAssets/ChristmasGame/Miser.png");
      robot.setStrength(1);
      // Set jump power
      robot.setJumpImpulses(0, 110);
      // Set 'w' to jump (this involves using keycodes)
      // Find the keycode of any key by going to www.keycode.info
      level.setKeyAction(87, level.jumpAction(robot, 0), null, false);
      // Set 'spacebar' to jump
      level.setKeyAction(32, level.jumpAction(robot, 0), null, false);
      // 'a' key to move left
      level.setKeyAction(65, level.makeXMotionAction(robot, -60), level.makeXMotionAction(robot, 0), true);
      // 'd' key to move right
      level.setKeyAction(68, level.makeXMotionAction(robot, 60), level.makeXMotionAction(robot, 0), true);
      // Make the camera follow our hero
      level.setCameraChase(robot);
      // Set the camera bounds
      level.setCameraBounds(1920, 540);
      // Create an "enemy" to kill the hero if he falls off the screen
      level.makeEnemyAsBox(0, 540, 1920, 1, "");
      // Set other bounds
      level.makeObstacleAsBox(0, 0, 1, 540, "");
      level.makeObstacleAsBox(1920, 0, 1, 540, "");
      level.makeObstacleAsBox(0, 0, 1920, 1, "");
      // Make the starting platform
      makePlatform(5, 16, 0, 356);

      //let dest = level.makeDestinationAsCircle();
      //dest.setActivationScore(7, 0, 0, 0);
      // Display coins collected
      level.addDisplay(25, 25, "Arial", "0x000000", 24, "Coins: ", "", level.DisplayGoodies1(), 0);

      /*
       * Here we create a function for making platforms, this makes it easy
       * because platforms consist of multiple blocks
       */
      function makePlatform(blocks: number, width: number, posX: number, posY: number) {
        if (blocks < 1)
          return;
        if (blocks == 1) {
          level.makeObstacleAsBox(posX, posY, width, width, "./GameAssets/ChristmasGame/MiddlePlat.png").setPhysics(1, 0, 2);
          return
        }
        level.makeObstacleAsBox(posX, posY, width, width, "./GameAssets/ChristmasGame/LeftEndPlat.png").setPhysics(1, 0, 2);
        level.makeObstacleAsBox(posX + width*(blocks-1), posY, width, width, "./GameAssets/ChristmasGame/RightEndPlat.png").setPhysics(1, 0, 2);

        for (let i = 1; i <= (blocks - 2); i++) {
          level.makeObstacleAsBox(posX + width*i, posY, width, width, "./GameAssets/ChristmasGame/MiddlePlat.png").setPhysics(1, 0, 2);
        }
      }
    }

    /*
     * LEVEL 3: This is going to be a flappy bird type game
     */
    else if (index == 3) {
      // Add some quality theme music
      level.setMusic("./GameAssets/PlaneGame/PlaneTheme.ogg");
      // Add a background
      level.drawPicture(0, 0, 962, 540, "./GameAssets/PlaneGame/PlaneBack.png", -2);
      level.drawPicture(960, 0, 962, 540, "./GameAssets/PlaneGame/PlaneBack.png", -2);
      level.drawPicture(1920, 0, 962, 540, "./GameAssets/PlaneGame/PlaneBack.png", -2);
      // Gravity
      //level.resetGravity(0, 50);
      // Don't let the plane fly out of bounds!
      level.drawBoundingBox(0, 0, 960*3, 540, "", 1, 0, 1);
      // Don't let the camera go out of bounds!
      level.setCameraBounds(960*3, 540);
      // Make the plane
      let plane: Hero = level.makeHeroAsBox(0, 540/2, 55, 37,"./GameAssets/PlaneGame/Plane.png");
      plane.setAbsoluteVelocity(50, 60);
      // 'w' key to move up
      level.setKeyAction(87, level.makeXYMotionAction(plane, 50, -50), level.makeXYMotionAction(plane, 50, 60), false);
      // 's' key to move down
      level.setKeyAction(83, level.makeXYMotionAction(plane, 50, 120), level.makeXYMotionAction(plane, 50, 60), false);
      // Make the camera follow the plane
      level.setCameraChase(plane);
      // Make rocks to crash into
      makeRock(false, 450, 100, 300);
      makeRock(true, 400, 100, 120);
      makeRock(false, 750, 100, 200);
      makeRock(true, 700, 100, 220);
      makeRock(false, 850, 100, 200);
      makeRock(true, 800, 100, 220);
      makeRock(false, 1050, 70, 400);
      makeRock(true, 1200, 70, 150);

      makeRock(true, 900, 70, 100);

      makeRock(false, 1250, 70, 100);

      makeRock(false, 1400, 80, 100);
      makeRock(true, 1300, 70, 300);
      makeRock(false, 1600, 90, 300);
      makeRock(true, 1700, 100, 100);

      makeRock(false, 1850, 70, 150);
      makeRock(true, 1850, 70, 320)
      makeRock(false, 2000, 70, 190);
      makeRock(true, 2000, 70, 290);

      makeRock(false, 2150, 50, 300);
      makeRock(true, 2300, 50, 300);
      makeRock(false, 2500, 100, 220);
      makeRock(true, 2500, 40, 220);
      makeRock(false, 2600, 120, 300);
      makeRock(true, 2820, 70, 400);

      // Set a victory destination at the end of the level
      let dest = level.makeDestinationAsBox(2860, 0, 20, 540, "");
      level.setVictoryDestination(1);

      /*
       * Here we create a function for making rocks. This makes it easy because
       * rocks are triangles, and this function does the vertex calculations for us
       * We probably care most about where the point of the rock is, so we make
       * the x position parameter the x position of the point
       */
      function makeRock(pointDown: boolean, posX: number, width: number, height: number) {
        if (pointDown) {
          level.makeEnemyAsPolygon(posX-width/2, -1, width, height, "./GameAssets/PlaneGame/RockDown.png", [-width/2,-height/2, width/2,-height/2, 0,height/2]);
        }
        else {
          level.makeEnemyAsPolygon(posX-width/2, 541-height, width, height, "./GameAssets/PlaneGame/RockUp.png", [-width/2,height/2, 0,-height/2, width/2,height/2]);
        }
      }
    }
  }
}
