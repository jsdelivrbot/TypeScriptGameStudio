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
            // set up a basic screen
            level.setBackgroundColor(0x00FFFF);

            level.addImage(700, 490, 150, 150, "../library/images/fun.jpg");
            level.addStaticText(480, 220, "Arial", 0xFFFFFF, 24, "This is an example Help screen", 0);
            level.addStaticText(480, 320, "Arial", 0xFFFFFF, 24, "Text and images can be displayed here", 0);
            level.addStaticText(480, 420, "Arial", 0xFFFFFF, 24, "This game is a side-scroller", 0);

            // set up a control to go to the splash screen on screen press
            level.addTapControl(0, 0, 960, 640, "", new (class _ extends LolAction {
                public go() {
                    level.doSplash();
                    return true;
                }
            })());
        }
    }
}
