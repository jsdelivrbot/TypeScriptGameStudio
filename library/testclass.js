"use strict";
/// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
/// <reference types="pixi.js"/>
var Actor = /** @class */ (function () {
    //mContainer: PIXI.Container;
    function Actor(scene, img, width, height) {
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
    Actor.prototype.setBoxPhysics = function (type, x, y) {
        var shape = new PhysicsType2d.Collision.Shapes.PolygonShape();
        shape.SetAsBoxAtOrigin(this.mSize.x / 2, this.mSize.y / 2);
        var boxBodyDef = new PhysicsType2d.Dynamics.BodyDefinition();
        boxBodyDef.type = type;
        boxBodyDef.position = new PhysicsType2d.Vector2(x + this.mSize.x / 2, y + this.mSize.y / 2);
        this.mBody = this.mScene.mWorld.CreateBody(boxBodyDef);
        var fd = new PhysicsType2d.Dynamics.FixtureDefinition();
        fd.shape = shape;
        fd.density = 0;
        fd.friction = 0;
        fd.restitution = 0;
        this.mBody.CreateFixtureFromDefinition(fd);
        this.mBody.SetUserData(this);
    };
    Actor.prototype.updateVelocity = function (x, y) {
        this.mBody.SetLinearVelocity(new PhysicsType2d.Vector2(x, y));
    };
    Actor.prototype.addVelocity = function (x, y) {
        var velocity = this.mBody.GetLinearVelocity();
        var additional = new PhysicsType2d.Vector2(x, y);
        velocity.x += additional.x;
        velocity.y += additional.y;
        this.updateVelocity(velocity.x, velocity.y);
    };
    Actor.prototype.render = function () {
        if (this.mBody)
            this.mSprite.position.x = this.mBody.GetWorldCenter().x;
        if (this.mBody)
            this.mSprite.position.y = this.mBody.GetWorldCenter().y;
    };
    return Actor;
}());
// TODO: Right now the camera can only follow an actor
var Camera = /** @class */ (function () {
    function Camera(chaseActor) {
        this.mContainer = new PIXI.Container();
        this.mChaseActor = chaseActor;
    }
    Camera.prototype.changeScene = function (scene) {
        this.mContainer.removeChildren();
        this.mScene = scene;
        this.mContainer.addChild(scene.mContainer);
    };
    Camera.prototype.updatePosition = function () {
        this.mContainer.pivot = this.mChaseActor.mSprite.position;
        this.mContainer.position.x = renderer.width / 2;
        this.mContainer.position.y = renderer.height / 2;
    };
    Camera.prototype.setZoom = function (x, y) {
        this.mContainer.scale.set(x, y);
    };
    Camera.prototype.zoomInOut = function (x, y) {
        var z = this.mContainer.scale;
        this.mContainer.scale.set(z.x * x, z.y * y);
    };
    return Camera;
}());
var Lol = /** @class */ (function () {
    function Lol(manager) {
        this.mManager = manager;
    }
    Lol.prototype.render = function () {
        this.mManager.mWorld.mWorld.Step(1 / 45, 8, 3);
        this.mManager.mWorld.mCamera.updatePosition();
        this.mManager.mWorld.render();
        this.mManager.mHud.render();
        renderer.render(this.mManager.mContainer);
    };
    return Lol;
}());
var LolManager = /** @class */ (function () {
    function LolManager(world, hud) {
        this.mWorld = world;
        if (hud)
            this.mHud = hud;
        this.mContainer = new PIXI.Container();
        this.mContainer.addChild(this.mWorld.mCamera.mContainer);
        if (hud)
            this.mContainer.addChild(hud.mContainer);
    }
    return LolManager;
}());
var Scene = /** @class */ (function () {
    function Scene() {
        this.mWorld = new PhysicsType2d.Dynamics.World(new PhysicsType2d.Vector2(0, 0));
        this.mRenderables = new Array();
        this.mContainer = new PIXI.Container();
    }
    Scene.prototype.addActor = function (actor) {
        this.mRenderables.push(actor);
        this.mContainer.addChild(actor.mSprite);
    };
    Scene.prototype.render = function () {
        this.mRenderables.forEach(function (e) {
            e.render();
        });
    };
    return Scene;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        return _super.call(this) || this;
    }
    MainScene.prototype.chaseActor = function (hero) {
        this.mChaseActor = hero;
        this.mCamera = new Camera(this.mChaseActor);
        this.mCamera.mContainer.addChild(this.mContainer);
    };
    return MainScene;
}(Scene));
// Testing file
/// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
/// <reference types="pixi.js"/>
var renderer = PIXI.autoDetectRenderer(512, 512);
var heroImg = "./images/OrangeBox.png";
var obstImg = "./images/BlueBox.png";
var zoomInImg = "./images/ZoomIn.png";
var zoomOutImg = "./images/ZoomOut.png";
var upImg = "./images/up_arrow.png";
var downImg = "./images/down_arrow.png";
var leftImg = "./images/left_arrow.png";
var rightImg = "./images/right_arrow.png";
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
    .load(function () { return main(20); });
function main(speed) {
    var mainScene = new MainScene();
    var Hero = new Actor(mainScene, heroImg, 25, 25);
    Hero.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.DYNAMIC, 100, 100);
    Hero.updateVelocity(speed, 0);
    mainScene.addActor(Hero);
    mainScene.chaseActor(Hero);
    var Obstacle1 = new Actor(mainScene, obstImg, 25, 25);
    Obstacle1.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.KINEMATIC, 0, 0);
    var Obstacle2 = new Actor(mainScene, obstImg, 50, 50);
    Obstacle2.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.KINEMATIC, 200, 200);
    var Obstacle3 = new Actor(mainScene, obstImg, 25, 25);
    Obstacle3.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.KINEMATIC, 75, 25);
    mainScene.addActor(Obstacle1);
    mainScene.addActor(Obstacle2);
    mainScene.addActor(Obstacle3);
    var hud = new Scene();
    var zoominBtn = new Actor(hud, zoomInImg, 25, 25);
    var zoomoutBtn = new Actor(hud, zoomOutImg, 25, 25);
    zoominBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 50, 10);
    zoomoutBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 10, 10);
    hud.addActor(zoominBtn);
    hud.addActor(zoomoutBtn);
    var upBtn = new Actor(hud, upImg, 25, 25);
    var downBtn = new Actor(hud, downImg, 25, 25);
    upBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 400, 380);
    downBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 400, 420);
    hud.addActor(upBtn);
    hud.addActor(downBtn);
    var leftBtn = new Actor(hud, leftImg, 25, 25);
    var rightBtn = new Actor(hud, rightImg, 25, 25);
    leftBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 380, 400);
    rightBtn.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, 420, 400);
    hud.addActor(leftBtn);
    hud.addActor(rightBtn);
    var mgr = new LolManager(mainScene, hud);
    mgr.mContainer.interactive = true;
    zoominBtn.mSprite.interactive = true;
    zoomoutBtn.mSprite.interactive = true;
    upBtn.mSprite.interactive = true;
    downBtn.mSprite.interactive = true;
    leftBtn.mSprite.interactive = true;
    rightBtn.mSprite.interactive = true;
    zoominBtn.mSprite.on('click', function () { return mgr.mWorld.mCamera.zoomInOut(1.25, 1.25); });
    zoomoutBtn.mSprite.on('click', function () { return mgr.mWorld.mCamera.zoomInOut(0.75, 0.75); });
    upBtn.mSprite.on('click', function () { return Hero.updateVelocity(0, -speed); });
    downBtn.mSprite.on('click', function () { return Hero.updateVelocity(0, speed); });
    leftBtn.mSprite.on('click', function () { return Hero.updateVelocity(-speed, 0); });
    rightBtn.mSprite.on('click', function () { return Hero.updateVelocity(speed, 0); });
    var game = new Lol(mgr);
    requestAnimationFrame(function () { return gameLoop2(game); });
}
function gameLoop2(game) {
    game.render();
    requestAnimationFrame(function () { return gameLoop2(game); });
}
