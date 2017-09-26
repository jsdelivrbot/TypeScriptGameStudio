"use strict";
// Testing file
/// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
/// <reference types="pixi.js"/>
var renderer = PIXI.autoDetectRenderer(512, 512);
var image = "./images/OrangeBox.png";
document.body.appendChild(renderer.view);
var Actor = /** @class */ (function () {
    function Actor(scene, img, width, height) {
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
    Actor.prototype.setVelocity = function (x, y) {
        this.mBody.SetLinearVelocity(new PhysicsType2d.Vector2(x, y));
    };
    Actor.prototype.render = function () {
        this.mSprite.position.x = this.mBody.GetWorldCenter().x;
        this.mSprite.position.y = this.mBody.GetWorldCenter().y;
        renderer.render(this.mContainer);
    };
    return Actor;
}());
var Scene = /** @class */ (function () {
    function Scene() {
        this.mWorld = new PhysicsType2d.Dynamics.World(new PhysicsType2d.Vector2(0, 0));
        this.mRenderables = new Array();
    }
    Scene.prototype.addActor = function (actor) {
        this.mRenderables.push(actor);
    };
    Scene.prototype.render = function () {
        this.mRenderables.forEach(function (e) {
            e.render();
        });
    };
    return Scene;
}());
main(50);
function main(speed) {
    var MainScene = new Scene();
    var Hero = new Actor(MainScene, image, 50, 50);
    MainScene.addActor(Hero);
    Hero.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.DYNAMIC, 0, 0);
    Hero.setVelocity(speed, 0);
    requestAnimationFrame(function () { return gameLoop(MainScene); });
}
function gameLoop(MainScene) {
    MainScene.mWorld.Step(1 / 45, 8, 3);
    MainScene.render();
}
