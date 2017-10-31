/// <reference path="./MainScene.ts"/>
/// <reference path="./HudScene.ts"/>
//// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
//// <reference types="pixi.js"/>

/**
 * These are the ways you can complete a level: you can reach the destination, you can collect
 * enough stuff, or you can reach a certain number of enemies defeated.
 * <p>
 * Technically, there's also 'survive for x seconds', but that doesn't need special support
 */
enum VictoryType {
    DESTINATION, GOODIECOUNT, ENEMYCOUNT
}

class LolManager {
  mContainer: PIXI.Container;


  /// A reference to the top-level game object
   private readonly mGame: Lol;
   /// A reference to the game configuration object
   private readonly mConfig: Config;
   /// The set of loaded assets
   private readonly mMedia: Media;
   /// The object that comprises the public API
   private readonly mLevel: Level;


   /// The physics world in which all actors exist
   mWorld: MainScene;
   /// A heads-up display
   mHud: HudScene;
   /// The scene to show when the level is created (if any)
    mPreScene: QuickScene;
   /// The scene to show when the level is won
   mWinScene: QuickScene;
   /// The scene to show when the level is lost
   mLoseScene: QuickScene;
   /// The scene to show when the level is paused (if any)
   mPauseScene: QuickScene;
   /// The background layers
   // mBackground: ParallaxScene;
   /// The foreground layers
   // mForeground: ParallaxScene;

   /// Store string/integer pairs that get reset whenever we restart the program, but which persist
   /// across levels
   readonly mSessionFacts: Map<string, number>;

   /// Modes of the game, for use by the state machine.  We can be showing the main splash
   /// screen, the help screens, the level chooser, the store, or a playable level
   readonly private SPLASH = 0;
   readonly private HELP = 1;
   readonly private CHOOSER = 2;
   readonly private STORE = 3;
   readonly private PLAY = 4;
   /// The current state (e.g., are we showing a STORE)
   private mMode: number;
   /// The level within each mode (e.g., we are in PLAY scene 4, and will return to CHOOSER 2)
   private mModeStates = new Array<number>(5);

   /// This is the number of goodies that must be collected, if we're in GOODIECOUNT mode
   mVictoryGoodieCount: Array<number>;
   /// Track the number of heroes that have been created
   mHeroesCreated: number;
   /// Count of the goodies that have been collected in this level
   mGoodiesCollected: Array<number>;
   /// Count the number of enemies that have been created
   mEnemiesCreated: number;
   /// Count the enemies that have been defeated
   mEnemiesDefeated: number;
   /// Track if the level has been lost (true) or the game is still being played (false)
   mGameOver: boolean;
   /// In levels that have a lose-on-timer feature, we store the timer here, so that we can extend
   /// the time left to complete a game
   ///
   /// NB: -1 indicates the timer is not active
   mLoseCountDownRemaining: number;
   /// Text to display when a Lose Countdown completes
   mLoseCountDownText: string;
   /// Time that must pass before the level ends in victory
   mWinCountRemaining: number;
   ///  Text to display when a Win Countdown completes
   mWinCountText: string;
   /// This is a stopwatch, for levels where we count how long the game has been running
   mStopWatchProgress: number;
   /// This is how far the hero has traveled
   mDistance: number;
   /// Track the number of heroes that have been removed/defeated
   private mHeroesDefeated: number;
   /// Number of heroes who have arrived at any destination yet
   private mDestinationArrivals: number;
   /// Describes how a level is won.
   mVictoryType: VictoryType;
   /// This is the number of heroes who must reach destinations, if we're in DESTINATION mode
   mVictoryHeroCount: number;
   /// The number of enemies that must be defeated, if we're in ENEMYCOUNT mode. -1 means "all"
   mVictoryEnemyCount: number;
   /// When the level is won or lost, this is where we store the event that needs to run
   mEndGameEvent: LolAction | null;
   /// Code to run when a level is won
   mWinCallback: LolAction | null;
   /// Code to run when a level is lost
   mLoseCallback: LolAction | null;

   /**
    * Construct the LolManager, build the scenes, set up the state machine, and clear the scores.
    *
    * @param config The game-wide configuration
    * @param media  All image and sound assets for the game
    * @param game   A reference to the top-level game object
    */
  constructor(config: Config, media: Media, game: Lol) {
    this.mGame = game;
    this.mConfig = config;
    this.mMedia = media;
    // Set up the API, so that any user code we call is able to reach this object
    this.mLevel = new Level(this.mConfig, this.mMedia, this.mGame);
    // build scenes and facts
    this.createScenes();
    this.mSessionFacts = new Map<string, number>();
    // set current mode states, and reset the scores
    for (let i = 0; i < 5; ++i)
        this.mModeStates[i] = 1;
    this.resetScores();

    // this.mWorld = world;
    // if (hud) this.mHud = hud;
    // this.mContainer = new PIXI.Container();
    // this.mContainer.addChild(this.mWorld.mCamera.mContainer);
    // if (hud) this.mContainer.addChild(this.mHud.mCamera.mContainer);
    //
    // this.mGoodiesCollected = new Array<number>();
  }

  /**
  * Reset all scores.  This should be called at the beginning of every level.
  */
  private resetScores(): void {
    this.mVictoryGoodieCount = new Array<number>(4);
    this.mHeroesCreated = 0;
    this.mGoodiesCollected = new Array<number>(0, 0, 0, 0);
    this.mEnemiesCreated = 0;
    this.mEnemiesDefeated = 0;
    this.mGameOver = false;
    this.mLoseCountDownRemaining = -100;
    this.mLoseCountDownText = "";
    this.mWinCountRemaining = -100;
    this.mWinCountText = "";
    this.mStopWatchProgress = -100;
    this.mDistance = 0;
    this.mHeroesDefeated = 0;
    this.mDestinationArrivals = 0;
    this.mVictoryType = VictoryType.DESTINATION;
    this.mVictoryHeroCount = 0;
    this.mVictoryEnemyCount = 0;
    this.mEndGameEvent = null;
    this.mWinCallback = null;
    this.mLoseCallback = null;
  }
}
