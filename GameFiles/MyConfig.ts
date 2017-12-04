/// <reference path="../library/Config.ts"/>
/// <reference path="./Levels.ts"/>
/// <reference path="./Chooser.ts"/>
/// <reference path="./Help.ts"/>
/// <reference path="./Splash.ts"/>
/// <reference path="./WinScene.ts"/>
/// <reference path="./LoseScene.ts"/>

/**
* Any configuration that the programmer needs to provide to Lol should go here.
* <p/>
* Config stores things like screen dimensions, default text and font configuration,
* and the names of all the assets (images and sounds) used by the game.
* <p/>
* Be sure to look at the Levels.java file for how each level of the game is
* drawn, as well as Splash.ts, Chooser.ts, Help.ts.
*/
class MyConfig extends Config {

  /**
  * The MyConfig object is used to pass configuration information to the LOL
  * system.
  * <p/>
  * To see documentation for any of these variables, hover your mouse
  * over the word on the left side of the equals sign.
  */
  constructor() {
    super();
    // The size of the screen, and some game behavior configuration
    this.mWidth = 960;
    this.mHeight = 540;
    this.mPixelMeterRatio = 20;
    this.mEnableVibration = true;
    this.mGameTitle = "Micah's Basic Game";
    this.mDefaultWinText = "Good Job";
    this.mDefaultLoseText = "Try Again";
    //this.mShowDebugBoxes = true;

    // Chooser configuration
    this.mNumLevels = 1;
    this.mEnableChooser = true;
    this.mUnlockAllLevels = true;

    // Font configuration
    this.mDefaultFontFace = "Arial";
    this.mDefaultFontSize = 32;
    this.mDefaultFontColor = "#FFFFFF";

    // list the images that the game will use
    this.mImageNames = new Array<string>(
     "./images/fun.jpg", "./images/BlueBox.png", "./images/OrangeBox.png",
     "./GameAssets/Angel.png", "./GameAssets/sky1.png", "./GameAssets/Bullet.png",
     "./GameAssets/CloudBall.png", "./GameAssets/BatSprite.png"
    );

    // list the sound effects that the game will use
    this.mSoundNames = new Array<string>(
    "./GameAssets/Shooting.ogg", "./GameAssets/EnemyKilled.wav"
    );

    // list the background music files that the game will use
    this.mMusicNames = new Array<string>(
    "./GameAssets/ThemeMusic.mp3"
    );

    // don't change these lines unless you know what you are doing
    this.mLevels = new Levels();
    this.mChooser = new Chooser();
    this.mHelp = new Help();
    this.mSplash = new Splash();
    this.mWin = new WinScene();
    this.mLose = new LoseScene();
  }
}