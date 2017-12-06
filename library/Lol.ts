/// <reference path="./LolManager.ts"/>
/// <reference path="./LolScene.ts"/>
//// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
//// <reference types="pixi.js"/>

class Lol {
  /// The Manager object handles scores, screen management, and transitions among screens
  mManager: LolManager;
  /// mRenderer renders the game
  mRenderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  /// mConfig stores the configuration state of the game.
  readonly mConfig: Config;
  /// mMedia stores all the images, sounds, and fonts for the game
  mMedia: Media;

  constructor(config: Config) {
    this.mConfig = config;
    this.mRenderer = PIXI.autoDetectRenderer(config.mWidth, config.mHeight);
  }

  /**
   * Instead of using Gdx.app.log directly, and potentially writing a lot of debug info in a
   * production setting, we use this to only dump to the log when debug mode is on
   *
   * @param config The game-wide configuration
   * @param tag    The message tag
   * @param text   The message text
   */
  static message(config: Config, tag: string, text: string): void {
      if (config.mShowDebugBoxes)
          console.log(tag + " " +  text);
  }

  /**
   * App creation lifecycle event.
   * NB: This is an internal method for initializing a game. User code should never call this.
   */
  public create(): void {
      // The config object has already been set, so we can load all assets
      this.mMedia = new Media(this.mConfig);

      // Create the level manager, and instruct it to transition to the Splash screen
      this.mManager = new LolManager(this.mConfig, this.mMedia, this);
      // Make sure all textures are loaded
      PIXI.loader.load(() => this.mManager.doSplash());
  }

  /**
   * This code is called every 1/60th of a second to update the game state and re-draw the screen
   * <p>
   * NB: This is an internal method. User code should never call this.
   */
  render() {
    this.mManager.mWorld.mWorld.Step(1 / 30, 8, 3);

    // Make sure the music is playing... Note that we start music before the PreScene shows
    this.mManager.mWorld.playMusic();
    // Adjust camera if it needs to follow an actor
    this.mManager.mWorld.adjustCamera();
    this.mManager.mWorld.render();
    this.mManager.mHud.render();
    this.mRenderer.render(this.mManager.mContainer);
    this.mManager.mWorld.mOneTimeEvents.forEach((pe) => {
      if(pe.mIsActive)
        pe.go();
    });
    this.mManager.mWorld.mOneTimeEvents.length = 0;

    this.mManager.mWorld.mRepeatEvents.forEach((pe) => {
      if(pe.mIsActive)
        pe.go();
    });

    // Update the win/lose timers
    this.mManager.updateTimeCounts();
  }
}
