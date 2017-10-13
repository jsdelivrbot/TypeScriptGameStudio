class Lol {
  mManager: LolManager;

  constructor(manager: LolManager) {
    this.mManager = manager;
  }

  render() {
    this.mManager.mWorld.mWorld.Step(1/45, 8, 3);
    this.mManager.mWorld.mCamera.updatePosition();
    this.mManager.mWorld.render();
    this.mManager.mHud.render();
    renderer.render(this.mManager.mContainer);
  }
}
