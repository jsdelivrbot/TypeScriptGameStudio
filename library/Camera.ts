// TODO: Right now the camera can only follow an actor
class Camera {
  mContainer: PIXI.Container;
  mScene: Scene;
  mChaseActor: Actor;

  constructor(chaseActor: Actor) {
    this.mContainer = new PIXI.Container();
    this.mChaseActor = chaseActor;
  }

  changeScene(scene: Scene) {
    this.mContainer.removeChildren();
    this.mScene = scene;
    this.mContainer.addChild(scene.mContainer);
  }

  updatePosition() {
    this.mContainer.pivot = this.mChaseActor.mSprite.position;
    this.mContainer.position.x = renderer.width / 2;
    this.mContainer.position.y = renderer.height / 2;
  }

  setZoom(x: number, y: number) {
    this.mContainer.scale.set(x, y);
  }

  zoomInOut(x: number, y:number) {
    let z = this.mContainer.scale;
    this.mContainer.scale.set(z.x * x, z.y * y);
  }
}
