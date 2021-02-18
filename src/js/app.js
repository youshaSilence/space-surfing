import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';
import '../css/style.css';
import Spaceship from './spaceship';
import Asteroid from './asteroid';

const {
  Body, Engine, Render, World, Bodies,
} = Matter;

const sceneContainer = document.querySelector('#game');
const canvasWidth = sceneContainer.offsetWidth;
const canvasHeight = sceneContainer.offsetHeight;

const sceneObjects = [];

const engine = Engine.create();
engine.world.gravity.x = 0;
engine.world.gravity.y = 0;

let spaceship;

function play(delta) {
  sceneObjects.forEach((object) => {
    object.sprite.update(delta, {
      bodyPosition: object.body.position,
      bodyAngle: object.body.angle,
    });
  });
}

let app;
const state = play;

function gameLoop(delta) {
  state(delta);
}

function createSceneSpaceship({ initialPosition, width, height, texture }) {
  // TODO Сделать нормальную форму корабля, а не примерную
  spaceship = new Spaceship({
    texture,
    x: initialPosition.x,
    y: initialPosition.y,
    width,
    height,
  });

  World.addBody(engine.world, spaceship.body);

  app.stage.addChild(spaceship);

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

  app.stage.addChild(asteroid);

  const object = {
    body: asteroidBody,
    sprite: asteroid,
  };

  sceneObjects.push(object);
}

function setup() {
  const id = app.loader.resources['img/spacesurfing.json'].textures;

  createSceneSpaceship({
    initialPosition: { x: canvasWidth / 2, y: canvasHeight / 2 },
    width: 70,
    height: 70,
    texture: id['spaceship.png'],
  });

  createSceneAsteroid({
    initialPosition: { x: 330, y: 130 },
    width: 100,
    height: 100,
    texture: id['asteroid1.png'],
  });

  createSceneAsteroid({
    initialPosition: { x: 130, y: 130 },
    width: 100,
    height: 100,
    texture: id['asteroid2.png'],
  });
}

function component() {
  app = new PIXI.Application({
    antialias: true,
    transparent: false,
    resolution: 1,
    resizeTo: sceneContainer,
  });

  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';
  app.renderer.autoResize = true;

  app.loader
    .add('img/spacesurfing.json')
    .load(setup);

  app.ticker.add((delta) => gameLoop(delta));

  sceneContainer.appendChild(app.view);

  Engine.run(engine);
}

component();
