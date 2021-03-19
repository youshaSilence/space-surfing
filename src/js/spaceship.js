import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';
import keyboard from './keyboard';

const { Bodies, Body } = Matter;

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

    this.thrust = 0.0004;

    this.maxAngularSpeed = 0.05;
    this.currentAngularSpeed = 0;
    this.angularAcceleration = 0.002;

    this.body = Bodies.polygon(
      x, y, 3, width / 2, { restitution: 0.8 },
    );

    this.setControls();
  }

  setControls() {
    this.keyboard = {};
    this.keyboard.left = keyboard('ArrowLeft');
    this.keyboard.right = keyboard('ArrowRight');
    this.keyboard.up = keyboard('ArrowUp');
    this.keyboard.down = keyboard('ArrowDown');
    // const space = keyboard(' ');

    this.keyboard.left.press = () => {
    };

    this.keyboard.left.release = () => {
      this.currentAngularSpeed = 0;
    };

    this.keyboard.up.press = () => {
      this.currentSpeed = this.body.speed;
    };
    this.keyboard.up.release = () => {
    };

    this.keyboard.right.press = () => {
    };
    this.keyboard.right.release = () => {
      this.currentAngularSpeed = 0;
    };

    this.keyboard.down.press = () => {
    };

    this.keyboard.down.release = () => {
    };
  }

  update(delta, { bodyPosition, bodyAngle }) {
    if (this.keyboard.up.isDown) {
      this.body.force.x -= this.thrust * Math.cos(this.body.angle + Math.PI * 0.5);
      this.body.force.y -= this.thrust * Math.sin(this.body.angle + Math.PI * 0.5);
    } else if (this.keyboard.down.isDown) {
      this.body.force.x += this.thrust * Math.cos(this.body.angle + Math.PI * 0.5);
      this.body.force.y += this.thrust * Math.sin(this.body.angle + Math.PI * 0.5);
    }

    if (this.keyboard.left.isDown) {
      if (this.currentAngularSpeed < this.maxAngularSpeed) {
        this.currentAngularSpeed += this.angularAcceleration;
      }
      Body.rotate(this.body, -this.currentAngularSpeed);
    }

    if (this.keyboard.right.isDown) {
      if (this.currentAngularSpeed < this.maxAngularSpeed) {
        this.currentAngularSpeed += this.angularAcceleration;
      }

      Body.rotate(this.body, this.currentAngularSpeed);
    }

    this.position = bodyPosition;
    this.rotation = bodyAngle;
  }
}
