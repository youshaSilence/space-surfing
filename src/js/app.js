import * as PIXI from 'pixi.js';
import '../css/style.css';
import Spaceship from './spaceship';
import Asteroid from './asteroid';

let spaceship;

function play(delta) {
  spaceship.update(delta);
}

let app;
const state = play;

function gameLoop(delta) {
  state(delta);
}

function setup() {
  const id = app.loader.resources['img/spacesurfing.json'].textures;

  const element = document.querySelector('#game');

  spaceship = new Spaceship({
    texture: id['spaceship.png'],
    x: element.offsetWidth / 2,
    y: element.offsetHeight / 2,
    width: 70,
    height: 70,
  });

  app.stage.addChild(spaceship);

  const asteroid1 = new Asteroid({
    texture: id['asteroid1.png'],
    x: 330,
    y: 130,
    width: 100,
    height: 100,
  });

  app.stage.addChild(asteroid1);

  const asteroid2 = new Asteroid({
    texture: id['asteroid2.png'],
    x: 130,
    y: 130,
    width: 100,
    height: 100,
  });

  app.stage.addChild(asteroid2);

  app.ticker.add((delta) => gameLoop(delta));
}

function component() {
  const element = document.querySelector('#game');

  app = new PIXI.Application({
    antialias: true,
    transparent: false,
    resolution: 1,
    // resizeTo: sceneContainer
  });

  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';
  app.renderer.autoResize = true;
  app.renderer.resize(element.offsetWidth, element.offsetHeight);

  app.loader
    .add('img/spacesurfing.json')
    .load(setup);

  element.appendChild(app.view);

  return element;
}

document.body.appendChild(component());
