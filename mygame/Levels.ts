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
    if (index == 1) {

      //level.resetGravity(0, 98);
      level.setMusic("./GameAssets/ThemeMusic.mp3");

      level.drawPicture(0, 0, 960, 640, "./GameAssets/sky1.png", -2);
      level.drawBoundingBox(0, 0, 960, 640, "./images/OrangeBox.png", 1, 1, 1);

      let h: Hero = level.makeHeroAsBox(960/2, 640/2, 32, 32, "./GameAssets/Angel.png");
      //level.setCameraChase(h);
      level.setArrowKeyControls(h, 50);
      //level.setKeyAction(32, level.JumpAction(h), false);
      //h.setJumpImpulses(0, 20);
      //h.setMultiJumpOn();

      level.configureProjectiles(5, 8, 8, "./GameAssets/Bullet.png", 2, 0, false);
      level.setKeyAction(32, level.makeRepeatThrow(h, 1000, 24, 16, 75, 0), false);
      level.setThrowSound("./GameAssets/Shooting.ogg");
      level.setProjectileVectorDampeningFactor(0.8);
      level.setProjectileRange(100);
      //level.setProjectileGravityOn();

      let e1: Enemy = level.makeEnemyAsBox(960/2 + 180, 640/2 + 100, 32, 32, "./GameAssets/BatSprite.png")
      let e2: Enemy = level.makeEnemyAsBox(960/2 - 80, 640/2 + 50, 32, 32, "./GameAssets/BatSprite.png")
      let e3: Enemy = level.makeEnemyAsBox(960/2 + 300, 640/2 - 150, 32, 32, "./GameAssets/BatSprite.png")

      e1.setDamage(2);
      e2.setDamage(4);
      e3.setDamage(6);

      e1.setRoute((new Route(3)).to(960/2 - 80, 640/2 + 100).to(960/2 - 80, 640/2 + 50).to(960/2, 640/2).to(960/2 - 80, 640/2 + 100), 50, true)
      e2.setChaseFixedMagnitude(h, 25, 25, false, false);

      let o1: Obstacle = level.makeObstacleAsCircle(500, 500, 32, 32, "./GameAssets/CloudBall.png");
      o1.setPhysics(1, 3, 1);
      let o2: Obstacle = level.makeObstacleAsCircle(532, 500, 32, 32, "./GameAssets/CloudBall.png");
      o2.setPhysics(1, 3, 1);

      level.setVictoryEnemyCount(-1);
      // draw a destination, and indicate that the level is won
      // when the hero reaches the level.
      //level.makeDestinationAsBox(960/2 + 55, 640/2 + 155, 100, 100, "./images/fun.jpg");
      //level.setVictoryDestination(1);
    }
  }
}
