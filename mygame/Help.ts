/// <reference path="../library/ScreenManager.ts"/>
/// <reference path="../library/LolAction.ts"/>

/**
 * Technically, Help can be anything... even playable levels. In this
 * demonstration, it's just a bit of information. It's a good place to put
 * instructions, credits, etc.
 */
 class Help implements ScreenManager {

   /**
  * Describe how to draw each level of help. Our help will have 2 screens
  */
  public display(index: number, level: Level): void {
    // Our first scene describes the color coding that we use for the
    // different entities in the game
    if (index == 1) {
      // Put in some catchy background muzak
      level.setMusic("./GameAssets/TitleTheme.mp3");
      // Add a background
      level.drawPicture(0, 0, 960, 540, "./GameAssets/TitleBack.png", -2);

      // Set up variables for the middle of the page to aid placement
      let midX = 960 / 2;
      let midY = 540 / 2;

      // Set up a control to go to the splash screen on screen press
      level.addTapControl(0, 0, 960, 540, "", new (class _ extends LolAction {
        public go() {
          level.doSplash();
          return true;
        }
      })());

      // Add some help messages
      level.addStaticTextCentered(midX, 100, "Arial", 0xFFFFFF, 24, "In these games, WASD is to move", 0);
      level.addStaticTextCentered(midX, 100, "Arial", 0xFFFFFF, 24, "Sky Fight:", 0);
      level.addStaticTextCentered(midX, 200, "Arial", 0xFFFFFF, 24, "Point and click to shoot", 0);
      level.addStaticTextCentered(midX, 300, "Arial", 0xFFFFFF, 24, "Defeat all enemies to win", 0);
      level.addStaticTextCentered(midX, 300, "Arial", 0xFFFFFF, 24, "They have 2 lives, so remember to double tap", 0);

     }
   }
}
