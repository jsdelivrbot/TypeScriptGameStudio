// /// <reference path="../library/ScreenManager.ts"/>
//
// /**
// * Chooser draws the level chooser screens. Our chooser code is pretty
// * straightforward. However, the different screens are drawn in different ways,
// * to show how we can write more effective code once we are comfortable with
// * loops and basic geometry.
// */
// class Chooser implements ScreenManager {
//
//   /**
//   * This is a helper function for drawing a level button. If the level is
//   * locked, the button isn't playable. Otherwise, the player can tap the
//   * button to start a level.
//   *
//   * @param x      X coordinate of the bottom left corner of the button
//   * @param y      Y coordinate of the bottom left corner of the button
//   * @param width  width of the button
//   * @param height height of the button
//   * @param whichLevel  which level to play when the button is tapped
//   */
//   private void drawLevelButton(final Level level, float x, float y, float width, float height, final int whichLevel) {
//     // figure out the last unlocked level
//     int unlocked = level.getGameFact("unlocked", 1);
//
//     // for each button, start by drawing an obstacle
//     Obstacle tile = level.makeObstacleAsBox(x, y, width, height, "leveltile.png");
//
//     // if this level is unlocked, or if we are in unlocked mode, then attach
//     // a callback and print the level number with a touchCallback, and then
//     // put text on top of it
//     if (whichLevel <= unlocked || level.getUnlockMode()) {
//       tile.setTapCallback(new TouchEventHandler() {
//         //@Override
//         public boolean go(float eventPositionX, float eventPositionY) {
//           level.doLevel(whichLevel);
//           return true;
//         }
//       });
//       level.addTextCentered(x+width/2, y+width/2, "arial.ttf", "#FFFFFF", 56, "", "", level.DisplayFixedText(""+whichLevel), 0);
//     }
//     // otherwise, just print an X
//     else {
//       level.addTextCentered(x+width/2, y+width/2, "arial.ttf", "#FFFFFF", 56, "", "", level.DisplayFixedText("X"), 0);
//     }
//   }
//
// /**
// * This helper function is for drawing the button that takes us to the previous chooser screen
// *
// * @param x            X coordinate of bottom left corner of the button
// * @param y            Y coordinate of bottom left corner of the button
// * @param width        width of the button
// * @param height       height of the button
// * @param chooserLevel The chooser screen to create
// */
// private void drawPrevButton(final Level level, float x, float y, float width, float height, final int chooserLevel) {
//   Obstacle prev = level.makeObstacleAsBox(x, y, width, height, "leftarrow.png");
//   prev.setTapCallback(new TouchEventHandler() {
//     @Override
//     public boolean go(float eventPositionX, float eventPositionY) {
//       level.doChooser(chooserLevel);
//       return true;
//     }
//   });
// }
//
// /**
// * This helper function is for drawing the button that takes us to the next chooser screen
// *
// * @param x            X coordinate of bottom left corner of the button
// * @param y            Y coordinate of bottom left corner of the button
// * @param width        width of the button
// * @param height       height of the button
// * @param chooserLevel The chooser screen to create
// */
// private void drawNextButton(final Level level, float x, float y, float width, float height, final int chooserLevel) {
//   Obstacle prev = level.makeObstacleAsBox(x, y, width, height, "rightarrow.png");
//   prev.setTapCallback(new TouchEventHandler() {
//     @Override
//     public boolean go(float eventPositionX, float eventPositionY) {
//       level.doChooser(chooserLevel);
//       return true;
//     }
//   });
// }
//
// /**
// * This helper function is for drawing the button that takes us back to the splash screen
// *
// * @param x      X coordinate of bottom left corner of the button
// * @param y      Y coordinate of bottom left corner of the button
// * @param width  width of the button
// * @param height height of the button
// */
// private void drawSplashButton(final Level level, float x, float y, float width, float height) {
//   Obstacle prev = level.makeObstacleAsBox(x, y, width, height, "backarrow.png");
//   prev.setTapCallback(new TouchEventHandler() {
//     //@Override
//     public boolean go(float eventPositionX, float eventPositionY) {
//       level.doSplash();
//       return true;
//     }
//   });
// }
//
// /**
// * Describe how to draw each level of the chooser. Our chooser will have 15
// * levels per screen, so we need 7 screens.
// */
// public display(index: number, level: Level): void {
//   // screen 1: show 1-->15
//   //
//   // NB: in this screen, we assume you haven't done much programming, so
//   // we draw each button with its own line of code, and we don't use any
//   // variables.
//   if (index == 1) {
//
//
//   // set up background and music
//   level.drawPicture(0, 0, 48, 32, "chooser.png", 0);
//
//   // for each button, draw an obstacle with a touchCallback, and then
//   // put text on top of it. Our buttons are 5x5, we have 1.5 meters
//   // between buttons, there's an 8.5 meter border on the left and
//   // right, and there's an 11 meter border on the top
//   drawLevelButton(level, 8.5, 16, 5, 5, 1);
//
//   drawSplashButton(level, 0, 0, 5, 5);
// }
// }
// }
