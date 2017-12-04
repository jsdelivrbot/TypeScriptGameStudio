/// <reference path="../library/ScreenManager.ts"/>

/**
* This is the scene that is displayed when you win a level
*/
class WinScene implements ScreenManager {
  /**
  * Implement the display function
  *
  * @param index Which level you won
  * @param level The public api
  */
  public display(index: number, level: Level): void {
    // Configure our win screen
    level.addStaticText(960/2 - 100, 640/2 - 10, "Arial", 0x00FFFF, 32, "You Win!!", 0);

    level.addTapControl(0, 0, 960, 640, "", new (class _ extends LolAction {
      public go(): boolean {
        level.doChooser(1);
        return true;
      }
    })());
  }
}
