/// <reference path="../library/ScreenManager.ts"/>

/**
* This is the scene that is displayed when you lose a level
*/
class LoseScene implements ScreenManager {
  /**
  * Implement the display function
  *
  * @param index The level you lost on
  * @param level The physics-based world that comprises the splash screen
  */
  public display(index: number, level: Level): void {
    // Configure our win screen
    level.addStaticText(960/2 - 100, 640/2 - 10, "Arial", 0x00FFFF, 32, "Try Again", 0);

    level.addTapControl(0, 0, 960, 640, "", new (class _ extends LolAction {
      public go(): boolean {
        level.doLevel(index);
        return true;
      }
    })());
  }
}
