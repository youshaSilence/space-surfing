import * as PIXI from 'pixi.js';

export default class Camera extends PIXI.Container {
  constructor({ pivot, position } = { pivot: {}, position: {} }) {
    super();

    this.position.set(position.x, position.y);
    this.pivot.set(pivot.x, pivot.y);
  }

  update({ position }) {
    this.pivot.set(position.x, position.y);

    // this.mapRect = new PIXI.Rectangle();
    // mapRect.x = camera.pivot.x - (canvasWidth / 2);
    // mapRect.y = camera.pivot.y - (canvasHeight / 2);
    // mapRect.width = canvasWidth;
    // mapRect.height = canvasHeight;
  }
}
