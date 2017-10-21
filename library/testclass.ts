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
.load(() => main(20));


function main(speed: number) {
  let mainScene = new MainScene();
  let Hero = new WorldActor(mainScene, heroImg, 25, 25);
  Hero.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.DYNAMIC, 100, 100);
  Hero.updateVelocity(speed, 0);

  mainScene.addActor(Hero);
  mainScene.chaseActor(Hero);

  let Obstacle1 = new WorldActor(mainScene, obstImg, 25, 25);
  Obstacle1.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.KINEMATIC, 0, 0);

  let Obstacle2 = new WorldActor(mainScene, obstImg, 50, 50);
  Obstacle2.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.KINEMATIC, 200, 200);

  let Obstacle3 = new WorldActor(mainScene, obstImg, 25, 25);
  Obstacle3.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.KINEMATIC, 75, 25);

  mainScene.addActor(Obstacle1);
  mainScene.addActor(Obstacle2);
  mainScene.addActor(Obstacle3);

  let hud = new HudScene();
  let zoominBtn = new WorldActor(hud, zoomInImg, 25, 25);
  let zoomoutBtn = new WorldActor(hud, zoomOutImg, 25, 25);
  zoominBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 50, 10);
  zoomoutBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 10, 10);

  hud.addActor(zoominBtn);
  hud.addActor(zoomoutBtn);

  let upBtn = new WorldActor(hud, upImg, 25, 25);
  let downBtn = new WorldActor(hud, downImg, 25, 25);
  upBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 400, 380);
  downBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 400, 420);
  hud.addActor(upBtn);
  hud.addActor(downBtn);

  let leftBtn = new WorldActor(hud, leftImg, 25, 25);
  let rightBtn = new WorldActor(hud, rightImg, 25, 25);
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
  zoominBtn.mSprite.on('click', () => mgr.mWorld.mCamera.zoomInOut(1.25));
  zoomoutBtn.mSprite.on('click', () => mgr.mWorld.mCamera.zoomInOut(0.75));
  upBtn.mSprite.on('click', () =>   Hero.updateVelocity(0, -speed));
  downBtn.mSprite.on('click', () =>   Hero.updateVelocity(0, speed));
  leftBtn.mSprite.on('click', () =>   Hero.updateVelocity(-speed, 0));
  rightBtn.mSprite.on('click', () =>   Hero.updateVelocity(speed, 0));

  let game = new Lol(mgr);

  requestAnimationFrame(() => gameLoop2(game));
}

function gameLoop2(game: Lol) {
  game.render();
  requestAnimationFrame(() => gameLoop2(game));
}
