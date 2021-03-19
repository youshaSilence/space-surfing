import * as PIXI from 'pixi.js';

export default class Stars extends PIXI.TilingSprite {
  constructor({ texture, width, height }) {
    super(texture, width, height);

    this.position.x = 0;
    this.position.y = 0;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;
  }

  update(x, y) {
    this.tilePosition.x -= x;
    this.tilePosition.y -= y;
  }
}
