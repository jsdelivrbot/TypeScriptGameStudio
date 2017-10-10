// Testing file
/// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
/// <reference types="pixi.js"/>

let renderer = PIXI.autoDetectRenderer(512, 512);
let heroImg = "./images/OrangeBox.png";
let obstImg = "./images/BlueBox.png"
let zoomInImg = "./images/ZoomIn.png";
let zoomOutImg = "./images/ZoomOut.png";
let upImg = "./images/up_arrow.png";
let downImg = "./images/down_arrow.png"
let leftImg = "./images/left_arrow.png";
let rightImg = "./images/right_arrow.png";
document.body.appendChild(renderer.view);

PIXI.loader
.add(heroImg)
.add(obstImg)
.add(zoomInImg)
.add(zoomOutImg)
.add(upImg)
.add(downImg)
.add(leftImg)
.add(rightImg)
.load(()=>main(20));

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

class LolManager {
  mWorld: MainScene;
  mHud: Scene;
  mContainer: PIXI.Container;

  constructor(world: MainScene, hud?: Scene) {
    this.mWorld = world;
    if (hud) this.mHud = hud;
    this.mContainer = new PIXI.Container();
    this.mContainer.addChild(world.mContainer);
    if (hud) this.mContainer.addChild(hud.mContainer);
  }
}

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
    if (this.mBody) this.mSprite.position.x = this.mBody.GetWorldCenter().x;
    if (this.mBody) this.mSprite.position.y = this.mBody.GetWorldCenter().y;
  }
}


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

class MainScene extends Scene {
  mChaseActor: Actor;
  mCamera: Camera;

  constructor() {
    super();
  }

  chaseActor(hero: Actor) {
    this.mChaseActor = hero;
    this.mCamera = new Camera(this.mChaseActor)
  }
}



function main(speed: number) {
  let mainScene = new MainScene();
  let Hero = new Actor(mainScene, heroImg, 25, 25);
  Hero.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.DYNAMIC, 100, 100);
  Hero.updateVelocity(speed, 0);

  mainScene.addActor(Hero);
  mainScene.chaseActor(Hero);

  let Obstacle1 = new Actor(mainScene, obstImg, 25, 25);
  Obstacle1.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.KINEMATIC, 50, 100);

  let Obstacle2 = new Actor(mainScene, obstImg, 50, 50);
  Obstacle2.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.KINEMATIC, 200, 200);

  let Obstacle3 = new Actor(mainScene, obstImg, 25, 25);
  Obstacle3.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.KINEMATIC, 425, 25);

  mainScene.addActor(Obstacle1);
  mainScene.addActor(Obstacle2);
  mainScene.addActor(Obstacle3);

  let hud = new Scene();
  let zoominBtn = new Actor(hud, zoomInImg, 25, 25);
  let zoomoutBtn = new Actor(hud, zoomOutImg, 25, 25);
  zoominBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 50, 10);
  zoomoutBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 10, 10);

  hud.addActor(zoominBtn);
  hud.addActor(zoomoutBtn);

  let upBtn = new Actor(hud, zoomInImg, 25, 25);
  let downBtn = new Actor(hud, zoomInImg, 25, 25);
  upBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 400, 390);
  downBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 400, 410);
  hud.addActor(upBtn);
  hud.addActor(downBtn);

  let leftBtn = new Actor(hud, zoomInImg, 25, 25);
  let rightBtn = new Actor(hud, zoomInImg, 25, 25);
  leftBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 380, 400);
  rightBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 420, 400);
  hud.addActor(leftBtn);
  hud.addActor(rightBtn);

  let mgr = new LolManager(mainScene, hud);
  mgr.mContainer.interactive = true;
  zoominBtn.mSprite.interactive = true;
  zoomoutBtn.mSprite.interactive = true;
  upBtn.mSprite.interactive = true;
  downBtn.mSprite.interactive = true;
  leftBtn.mSprite.interactive = true;
  rightBtn.mSprite.interactive = true;
  zoominBtn.mSprite.on('click', () => mgr.mWorld.mCamera.zoomInOut(1.25, 1.25));
  zoomoutBtn.mSprite.on('click', () => mgr.mWorld.mCamera.zoomInOut(0.75, 0.75));
  upBtn.mSprite.on('click', () =>   Hero.updateVelocity(0, -speed));
  downBtn.mSprite.on('click', () =>   Hero.updateVelocity(0, speed));
  leftBtn.mSprite.on('click', () =>   Hero.updateVelocity(-speed, 0));
  rightBtn.mSprite.on('click', () =>   Hero.updateVelocity(speed, 0));

  let game = new Lol(mgr);

  requestAnimationFrame(() => gameLoop(game));
}

function gameLoop(game: Lol) {
  game.render();
  requestAnimationFrame(() => gameLoop(game));
}
