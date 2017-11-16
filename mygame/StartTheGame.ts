/// <reference path="../library/Config.ts"/>
/// <reference path="../library/Lol.ts"/>
/// <reference path="../library/Level.ts"/>
/// <reference path="../library/MyConfig.ts"/>

let myConfig = new MyConfig();

let game = new Lol(myConfig);
game.create();
requestAnimationFrame(() => gameLoop(game));

function gameLoop(game: Lol) {
  game.render();
  requestAnimationFrame(() => gameLoop(game));
}
