import * as PIXI from 'pixi.js';

export default class Asteroid extends PIXI.Sprite {
  constructor({
    texture, x, y, width, height,
  } = {
    x: 0, y: 0, width: 50, height: 50, speed: 1,
  }) {
    super(texture);

    this.width = width;
    this.height = height;
    this.anchor.set(0.5, 0.5);
    this.position.set(x, y);
  }
}
