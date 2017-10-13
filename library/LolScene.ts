class Scene {
  mWorld: PhysicsType2d.Dynamics.World;
  mRenderables: Array<Actor>;
  mContainer: PIXI.Container;

  constructor() {
    this.mWorld = new PhysicsType2d.Dynamics.World(new PhysicsType2d.Vector2(0, 0));
    this.mRenderables = new Array<Actor>();
    this.mContainer = new PIXI.Container();
  }

  addActor(actor: Actor) {
    this.mRenderables.push(actor);
    this.mContainer.addChild(actor.mSprite);
  }

  render() {
    this.mRenderables.forEach((e) => {
      e.render();
    });
  }
}
