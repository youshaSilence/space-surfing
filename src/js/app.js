import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';

import Spaceship from './spaceship';
import Asteroid from './asteroid';
import Camera from './camera';
import Stars from './stars';

let app;
let mid;
let far;
let back;
let spaceship;
let camera;

const {
  Engine, World, Bodies,
} = Matter;

const engine = Engine.create();
engine.world.gravity.x = 0;
engine.world.gravity.y = 0;

const canvas = document.getElementById('game-canvas');

const sceneObjects = [];

function gameLoop(delta) {
  sceneObjects.forEach((object) => {
    object.sprite.update(delta, {
      bodyPosition: object.body.position,
      bodyAngle: object.body.angle,
    });
  });

  camera.update({
    position: {
      x: spaceship.position.x,
      y: spaceship.position.y,
    },
  });

  far.update(spaceship.body.velocity.x / 10, spaceship.body.velocity.y / 10);
  mid.update(spaceship.body.velocity.x / 5, spaceship.body.velocity.y / 5);
}

function createSceneSpaceship({
  initialPosition, width, height, texture,
}) {
  // TODO Сделать нормальную форму корабля, а не примерную
  spaceship = new Spaceship({
    texture,
    x: initialPosition.x,
    y: initialPosition.y,
    width,
    height,
  });

  World.addBody(engine.world, spaceship.body);

  sceneObjects.push({ // TODO
    body: spaceship.body,
    sprite: spaceship,
  });
}

function createSceneAsteroid({
  initialPosition, width, height, texture,
}) {
  // TODO Сделать нормальную форму астероида, а не примерную
  const asteroidBody = Bodies.circle(
    initialPosition.x, initialPosition.y, width / 2, { restitution: 0.8 },
  );

  World.addBody(engine.world, asteroidBody);

  const asteroid = new Asteroid({
    texture,
    x: initialPosition.x,
    y: initialPosition.y,
    width,
    height,
  });

  const object = {
    body: asteroidBody,
    sprite: asteroid,
  };

  sceneObjects.push(object);

  return asteroid;
}

function setup() {
  const backTexture = app.loader.resources['img/background-space.jpg'].texture;
  back = new PIXI.Sprite(backTexture);
  back.width = canvas.width;
  back.height = canvas.height;
  back.position.x = 0;
  back.position.y = 0;
  app.stage.addChild(back);

  far = new Stars({
    texture: app.loader.resources['img/background-stars-far.png'].texture,
    width: canvas.width,
    height: canvas.width,
  });
  app.stage.addChild(far);

  mid = new Stars({
    texture: app.loader.resources['img/background-stars.png'].texture,
    width: canvas.width,
    height: canvas.width,
  });
  app.stage.addChild(mid);

  const id = app.loader.resources['img/spacesurfing.json'].textures;

  createSceneSpaceship({
    initialPosition: { x: canvas.width / 2, y: canvas.height / 2 },
    width: 70,
    height: 70,
    texture: id['spaceship.png'],
  });

  const a1 = createSceneAsteroid({
    initialPosition: { x: 330, y: 130 },
    width: 100,
    height: 100,
    texture: id['asteroid1.png'],
  });

  const a2 = createSceneAsteroid({
    initialPosition: { x: 130, y: 130 },
    width: 100,
    height: 100,
    texture: id['asteroid2.png'],
  });

  camera = new Camera({
    position: {
      x: canvas.width / 2,
      y: canvas.height / 2,
    },
    pivot: {
      x: spaceship.position.x,
      y: spaceship.position.y,
    },
  });

  camera.addChild(spaceship);
  camera.addChild(a1);
  camera.addChild(a2);

  app.stage.addChild(camera);

  Engine.run(engine);

  app.ticker.add((delta) => gameLoop(delta));
}

function init() {
  app = new PIXI.Application({
    width: canvas.width,
    height: canvas.height,
    backgroundColor: '0xffffff',
    antialias: true,
    view: document.getElementById('game-canvas'),
  });

  app.loader
    .add('img/spacesurfing.json')
    .add('img/background-space.jpg')
    .add('img/background-stars-far.png')
    .add('img/background-stars.png')
    .load(setup);
}

window.onload = init();
