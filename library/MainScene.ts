class MainScene extends Scene {
  mChaseActor: Actor;
  mCamera: Camera;

  constructor() {
    super();
  }

  chaseActor(hero: Actor) {
    this.mChaseActor = hero;
    this.mCamera = new Camera(this.mChaseActor);
    this.mCamera.mContainer.addChild(this.mContainer);
  }
}
