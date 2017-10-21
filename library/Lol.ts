/// <reference path="./LolManager.ts"/>
/// <reference path="./LolScene.ts"/>
/// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
/// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
//// <reference types="pixi.js"/>

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
