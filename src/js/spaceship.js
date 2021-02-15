import * as PIXI from 'pixi.js';
import keyboard from './keyboard';

export default class Spaceship extends PIXI.Sprite {
  constructor({
    texture, x, y, width, height,
  } = {
    x: 0, y: 0, width: 50, height: 50,
  }) {
    super(texture);
    this.width = width;
    this.height = height;
    this.anchor.set(0.5, 0.5);
    this.position.set(x, y);

    this.vx = 0;
    this.vy = 0;

    this.setControls();
  }

  setControls() {
    const left = keyboard('ArrowLeft');
    const right = keyboard('ArrowRight');
    const up = keyboard('ArrowUp');
    const down = keyboard('ArrowDown');
    // const space = keyboard(' ');

    left.press = () => {
      this.vy = 0;
      this.vx = -5;
    };

    left.release = () => {
      if (!right.isDown && this.vy === 0) {
        this.vx = 0;
      }
    };

    up.press = () => {
      this.vy = -5;
      this.vx = 0;
    };
    up.release = () => {
      if (!down.isDown && this.vx === 0) {
        this.vy = 0;
      }
    };

    // Right
    right.press = () => {
      this.vx = 5;
      this.vy = 0;
    };
    right.release = () => {
      if (!left.isDown && this.vy === 0) {
        this.vx = 0;
      }
    };

    // Down
    down.press = () => {
      this.vy = 5;
      this.vx = 0;
    };
    down.release = () => {
      if (!up.isDown && this.vx === 0) {
        this.vy = 0;
      }
    };
  }

  update() {
    this.y += this.vy;
    this.x += this.vx;
  }
}
