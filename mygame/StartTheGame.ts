/// <reference path="../library/Config.ts"/>
/// <reference path="../library/Lol.ts"/>
/// <reference path="../library/Level.ts"/>
/// <reference path="../library/MyConfig.ts"/>
/// <reference path="../library/typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
/// <reference types="pixi.js"/>

let myConfig = new MyConfig();

let game = new Lol(myConfig);
game.create();
requestAnimationFrame(() => gameLoop(game));

function gameLoop(game: Lol) {
  game.render();
  requestAnimationFrame(() => gameLoop(game));
}
