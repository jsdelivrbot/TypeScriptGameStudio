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
      // We want to intercept 'back' button presses, so that we can poll for them in
      // <code>render</code> and react accordingly
      //Gdx.input.setCatchBackKey(true);

      // The config object has already been set, so we can load all assets
      this.mMedia = new Media(this.mConfig);

      // Configure the objects we need in order to render
      //mDebugRender = new Box2DDebugRenderer();
      //mSpriteBatch = new SpriteBatch();

      // Configure the input handlers.  We process gestures first, and if no gesture occurs, then
      // we look for a non-gesture touch event
      //InputMultiplexer mux = new InputMultiplexer();
      //mux.addProcessor(new GestureDetector(new LolGestureManager()));
      //mux.addProcessor(new LolInputManager());
      //Gdx.input.setInputProcessor(mux);

      // configure the volume
      //if (getGameFact(mConfig, "volume", 1) == 1)
      //    putGameFact(mConfig, "volume", 1);

      // this.mConfig.mImageNames.forEach( (e) => {
      //   PIXI.loader.add(e);
      // } );
      // PIXI.loader.load();

      // Create the level manager, and instruct it to transition to the Splash screen
      this.mManager = new LolManager(this.mConfig, this.mMedia, this);
      this.mManager.doSplash();
  }

  /**
   * This code is called every 1/45th of a second to update the game state and re-draw the screen
   * <p>
   * NB: This is an internal method. User code should never call this.
   */
  render() {
    this.mManager.mWorld.mWorld.Step(1/45, 8, 3);

    // Make sure the music is playing... Note that we start music before the PreScene shows
    this.mManager.mWorld.playMusic();

    this.mManager.mWorld.adjustCamera();
    //this.mManager.mWorld.mCamera.updatePosition();
    this.mManager.mWorld.render();
    this.mManager.mHud.render();
    this.mRenderer.render(this.mManager.mContainer);
    this.mManager.mWorld.mOneTimeEvents.forEach((pe) => {
       pe.go();
    });
    this.mManager.mWorld.mOneTimeEvents.length = 0;

    this.mManager.mWorld.mRepeatEvents.forEach((pe) => {
       pe.go();
    });
  }
}
