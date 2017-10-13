/// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
/// <reference types="pixi.js"/>

class Actor {
  mSize: PhysicsType2d.Vector2;
  mBody: PhysicsType2d.Dynamics.Body;
  mScene: Scene;
  mSprite: PIXI.Sprite;
  //mContainer: PIXI.Container;

  constructor(scene: Scene, img: string, width: number, height: number) {
    this.mScene = scene;
    this.mSprite = new PIXI.Sprite(PIXI.loader.resources[img].texture);
    this.mSize = new PhysicsType2d.Vector2(width, height);
    //this.mContainer = new PIXI.Container();
    this.mSprite.width = this.mSize.x;
    this.mSprite.height = this.mSize.y;
    this.mSprite.anchor.x = 0.5;
    this.mSprite.anchor.y = 0.5;
    //this.mContainer.addChild(this.mSprite);
  }

  setBoxPhysics(type: PhysicsType2d.Dynamics.BodyType, x: number, y: number) {
    let shape = new PhysicsType2d.Collision.Shapes.PolygonShape();
    shape.SetAsBoxAtOrigin(this.mSize.x / 2, this.mSize.y / 2);

    let boxBodyDef = new PhysicsType2d.Dynamics.BodyDefinition();
    boxBodyDef.type = type;
    boxBodyDef.position = new PhysicsType2d.Vector2(x + this.mSize.x / 2, y + this.mSize.y / 2);

    this.mBody = this.mScene.mWorld.CreateBody(boxBodyDef);

    let fd = new PhysicsType2d.Dynamics.FixtureDefinition();
    fd.shape = shape;
    fd.density = 0;
    fd.friction = 0;
    fd.restitution = 0;
    this.mBody.CreateFixtureFromDefinition(fd);

    this.mBody.SetUserData(this);
  }

  updateVelocity(x: number, y: number) {
    this.mBody.SetLinearVelocity(new PhysicsType2d.Vector2(x, y));
  }

  addVelocity(x: number, y: number) {
    let velocity = this.mBody.GetLinearVelocity();
    let additional = new PhysicsType2d.Vector2(x, y);
    velocity.x += additional.x;
    velocity.y += additional.y;
    this.updateVelocity(velocity.x, velocity.y);
  }

  render() {
    if(this.mBody) this.mSprite.position.x = this.mBody.GetWorldCenter().x;
    if(this.mBody) this.mSprite.position.y = this.mBody.GetWorldCenter().y;
  }
}
