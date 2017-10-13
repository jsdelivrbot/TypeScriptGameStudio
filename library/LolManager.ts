class LolManager {
  mWorld: MainScene;
  mHud: Scene;
  mContainer: PIXI.Container;

  constructor(world: MainScene, hud?: Scene) {
    this.mWorld = world;
    if (hud) this.mHud = hud;
    this.mContainer = new PIXI.Container();
    this.mContainer.addChild(this.mWorld.mCamera.mContainer);
    if (hud) this.mContainer.addChild(hud.mContainer);
  }
}
