/// <reference path="../library/ScreenManager.ts"/>

/**
* Chooser draws the level chooser screens. Our chooser code is pretty
* straightforward. However, the different screens are drawn in different ways,
* to show how we can write more effective code once we are comfortable with
* loops and basic geometry.
*/
class Chooser implements ScreenManager {
  /**
  * Describe how to draw each level of the chooser. Our chooser will have 15
  * levels per screen, so we need 7 screens.
  */
  public display(index: number, level: Level): void {
    // screen 1: show 1-->15
    //
    // NB: in this screen, we assume you haven't done much programming, so
    // we draw each button with its own line of code, and we don't use any
    // variables.
    if (index == 1) {
      // Set variables for easy placement of objects
      let midX = 960 / 2;
      let midY = 540 / 2;

      // Back to splash
      level.addStaticText(midX - 50, midY + 100, "Arial", 0xFFFF00, 24, "Back to Menu", 0);

      level.addTapControl(midX - 50, midY + 100, 100, 50, "./GameAssets/buttonLarge.png", new (class _ extends LolAction {
        public go(): boolean {
          level.doSplash();
          return true;
        }
      })());

      // Play level 1 button
      level.addStaticText(midX - 400, midY - 100, "Arial", 0xFFFF00, 24, "Play Sky Fighter", 0);

      level.addTapControl(midX - 400, midY - 100, 100, 50, "./GameAssets/buttonLarge.png", new (class _ extends LolAction {
        public go(): boolean {
          level.doLevel(1);
          return true;
        }
      })());

      // Play level 2 button
      level.addStaticText(midX, midY - 100, "Arial", 0xFFFF00, 24, "Play Christmas Scramble", 0);

      level.addTapControl(midX, midY - 100, 100, 50, "./GameAssets/buttonLarge.png", new (class _ extends LolAction {
        public go(): boolean {
          level.doLevel(2);
          return true;
        }
      })());

      // Play level 3 button
      level.addStaticText(midX + 400, midY - 100, "Arial", 0xFFFF00, 24, "Play Dodgy Plane", 0);

      level.addTapControl(midX + 400, midY - 100, 100, 50, "./GameAssets/buttonLarge.png", new (class _ extends LolAction {
        public go(): boolean {
          level.doLevel(3);
          return true;
        }
      })());
    }
  }
}