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

      //level.resetGravity(0, 9.8);

      level.drawPicture(0, 0, 960, 640, "./images/BlueBox.png", -2)
      level.drawBoundingBox(0, 0, 960, 640, "./images/OrangeBox.png", 1, 1, 1);

      let h: Hero = level.makeHeroAsBox(960/2, 640/2, 30, 30, "./images/OrangeBox.png");
      level.setCameraChase(h);
      level.setArrowKeyControls(h, 50);

      //level.configureProjectiles(5, 3, 3, "./images/OrangeBox.png", 2, 0, false);
      //level.setKeyAction("f", level.makeRepeatThrow(h, 1000, 2, 0, 4, 4), false)

      let e: Enemy = level.makeEnemyAsBox(960/2 - 80, 640/2 + 100, 30, 30, "./images/OrangeBox.png")

      e.setRoute((new Route(3)).to(960/2 - 80, 640/2 + 100).to(960/2 - 80, 640/2 + 50).to(960/2, 640/2), 150, true)
      //let o: Obstacle = level.makeObstacleAsBox(0, 500, 960, 1, "./images/BlueBox.png");

      // draw a destination, and indicate that the level is won
      // when the hero reaches the level.
      level.makeDestinationAsBox(960/2 + 55, 640/2 + 155, 100, 100, "./images/fun.jpg");
      level.setVictoryDestination(1);
    }
  }
}
