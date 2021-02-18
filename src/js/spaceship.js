import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';
import keyboard from './keyboard';
import { getXPos, getYPos } from './utils';

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

    this.maxSpeed = 5;
    this.currentSpeed = 0;
    this.acceleration = 0.07;

    this.maxAngularSpeed = 0.05;
    this.currentAngularSpeed = 0;
    this.angularAcceleration = 0.002;

    this.body = Bodies.polygon(
      x, y, 3, width / 2, { restitution: 0.2 },
    );

    // Body.setInertia(this.body, 100);
    //Body.setMass(this.body, 1000);
    // this.body.friction = 0.1;

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
      // this.body.torque = -0.1;
      // this.vr = -0.03;
    };

    this.keyboard.left.release = () => {
      this.currentAngularSpeed = 0;
      // this.vr = 0;
    };

    this.keyboard.up.press = () => {
      this.currentSpeed = this.body.speed;
      // this.vspeed = 1;
    };
    this.keyboard.up.release = () => {
      // this.currentSpeed = 0;
      // this.vspeed = 0;
    };

    this.keyboard.right.press = () => {
      // this.vr = 0.03;
    };
    this.keyboard.right.release = () => {
      this.currentAngularSpeed = 0;
      // this.vr = 0;
    };

    this.keyboard.down.press = () => {
      // this.currentSpeed = this.body.speed;
      // this.currentSpeed -= 0.5;
    };

    this.keyboard.down.release = () => {
    };
  }

  update(delta, { bodyPosition, bodyAngle }) {
    if (this.keyboard.up.isDown) {
      // if (this.currentSpeed < this.maxSpeed) {
      //   this.currentSpeed += this.acceleration;
      // }

      const y = getYPos(this.body.angle, this.body.speed + this.acceleration);
      const x = getXPos(this.body.angle, this.body.speed + this.acceleration);
      Body.setVelocity(this.body, { x, y: -y });
    }

    if (this.keyboard.down.isDown) {
      const y = getYPos(this.body.angle, this.body.speed - 0.01);
      const x = getXPos(this.body.angle, this.body.speed - 0.01);

      Body.setVelocity(this.body, { x, y: -y });
    }

    if (this.keyboard.left.isDown) {
      if (this.currentAngularSpeed < this.maxAngularSpeed) {
        this.currentAngularSpeed += this.angularAcceleration;
      }

      Body.setAngularVelocity(this.body, -this.currentAngularSpeed);
    }

    if (this.keyboard.right.isDown) {
      if (this.currentAngularSpeed < this.maxAngularSpeed) {
        this.currentAngularSpeed += this.angularAcceleration;
      }

      Body.setAngularVelocity(this.body, this.currentAngularSpeed);
    }

    // this.body.torque = this.vr;

    this.position = bodyPosition;
    this.rotation = bodyAngle;
    // this.y += this.vy;
    // this.x += this.vx;
  }
}
