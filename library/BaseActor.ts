/// <reference path="./Renderable.ts"/>
/// <reference path="./LolScene.ts"/>
/// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
/// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
/// <reference types="pixi.js"/>

/**
 * BaseActor is the parent of all Actor types.
 *
 * We use BaseActor as parent of both WorldActor (MainScene) and SceneActor (all other scenes), so that
 * core functionality (physics, animation) can be in one place, even though many of the features of
 * an WorldActor (MainScene) require a Score object, and are thus incompatible with non-Main scenes.
 */
class BaseActor extends Renderable {
  /// The level in which this Actor exists
  readonly mScene: LolScene;

  /// Physics body for this WorldActor
  mBody: PhysicsType2d.Dynamics.Body;

  /// Track if the underlying body is a circle
  private mIsCircleBody: boolean;
  /// Track if the underlying body is a box
  private mIsBoxBody: boolean;
  /// Track if the underlying body is a polygon
  private mIsPolygonBody: boolean;

  /// The dimensions of the WorldActor... x is width, y is height
  mSize: PhysicsType2d.Vector2;

  /// The z index of this actor. Valid range is [-2, 2]
  private mZIndex: number;

  /// The sprite associated with this actor
  mSprite: PIXI.Sprite;

  constructor(scene: LolScene, img: string, width: number, height: number) {
    super();
    this.mScene = scene;
    this.mSprite = new PIXI.Sprite(PIXI.loader.resources[img].texture);
    this.mSize = new PhysicsType2d.Vector2(width, height);
    this.mSprite.width = this.mSize.x;
    this.mSprite.height = this.mSize.y;
    this.mSprite.anchor.x = 0.5;
    this.mSprite.anchor.y = 0.5;
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

  // Override
  onRender() {
    if(this.mBody) this.mSprite.position.x = this.mBody.GetWorldCenter().x;
    if(this.mBody) this.mSprite.position.y = this.mBody.GetWorldCenter().y;
  }
}
