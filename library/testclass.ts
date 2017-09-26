// Testing file
/// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
/// <reference types="pixi.js"/>

let renderer = PIXI.autoDetectRenderer(512, 512);
let image = "./images/OrangeBox.png";
document.body.appendChild(renderer.view);


class Actor {
  mSize: PhysicsType2d.Vector2;
  mBody: PhysicsType2d.Dynamics.Body;
  mScene: Scene;
  mSprite: PIXI.Sprite;
  mContainer: PIXI.Container;

  constructor(scene: Scene, img: string, width: number, height: number) {
    PIXI.loader.add(img).load();
    this.mScene = scene;
    this.mSprite = new PIXI.Sprite(PIXI.loader.resources[img].texture);
    this.mSize = new PhysicsType2d.Vector2(width, height);
    this.mContainer = new PIXI.Container();
    this.mContainer.addChild(this.mSprite);
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

  setVelocity(x: number, y: number) {
    this.mBody.SetLinearVelocity(new PhysicsType2d.Vector2(x, y));
  }

  render() {
    this.mSprite.position.x = this.mBody.GetWorldCenter().x;
    this.mSprite.position.y = this.mBody.GetWorldCenter().y;
    renderer.render(this.mContainer);
  }
}


class Scene {
  mWorld: PhysicsType2d.Dynamics.World;
  mRenderables: Array<Actor>;

  constructor() {
    this.mWorld = new PhysicsType2d.Dynamics.World(new PhysicsType2d.Vector2(0, 0));
    this.mRenderables = new Array<Actor>();
  }

  addActor(actor: Actor) {
    this.mRenderables.push(actor);
  }

  render() {
    this.mRenderables.forEach((e) => {
      e.render();
    });
  }
}

main(50);

function main(speed: number) {
  let MainScene = new Scene();
  let Hero = new Actor(MainScene, image, 50, 50);
  MainScene.addActor(Hero);
  Hero.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.DYNAMIC, 0, 0);
  Hero.setVelocity(speed, 0);
  requestAnimationFrame(() => gameLoop(MainScene));
}

function gameLoop(MainScene: Scene) {
  MainScene.mWorld.Step(1/45, 8, 3);
  MainScene.render();
}
