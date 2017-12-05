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

      // Back to splash button
      // This adds text for the button
      level.addStaticTextCentered(midX, midY + 75, "Arial", 0x00FFFF, 24, "Menu", 1);
      // This makes the button functional
      level.addTapControl(midX - 50, midY + 75, 100, 50, "", new (class _ extends LolAction {
        public go(): boolean {
          level.doSplash();
          return true;
        }
      })());
      // This draws the button picture
      level.drawPicture(midX - 50, midY + 75, 100, 50, "./GameAssets/button.png", -1);

      // Play level 1 button
      // Colors are written in hex values
      level.addStaticTextCentered(150, midY - 125, "Arial", 0x00FFFF, 24, "Sky Fighter", 1);

      level.addTapControl(50, midY - 125, 200, 50, "./GameAssets/button.png", new (class _ extends LolAction {
        public go(): boolean {
          level.doLevel(1);
          return true;
        }
      })());

      level.drawPicture(50, midY - 125, 200, 50, "./GameAssets/button.png", -1);

      // Play level 2 button
      level.addStaticTextCentered(midX, midY - 125, "Arial", 0x00FFFF, 24, "Christmas Scramble", 1);

      level.addTapControl(midX - 125, midY - 125, 250, 50, "./GameAssets/button.png", new (class _ extends LolAction {
        public go(): boolean {
          level.doLevel(2);
          return true;
        }
      })());

      level.drawPicture(midX - 125, midY - 125, 250, 50, "./GameAssets/button.png", -1);


      // Play level 3 button
      level.addStaticTextCentered(960 - 150, midY - 125, "Arial", 0x00FFFF, 24, "Dodgy Plane", 1);

      level.addTapControl(960 - 250, midY - 125, 200, 50, "", new (class _ extends LolAction {
        public go(): boolean {
          level.doLevel(3);
          return true;
        }
      })());

      level.drawPicture(960 - 250, midY - 125, 200, 50, "./GameAssets/button.png", -1);
    }
  }
}
