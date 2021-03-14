import Vec2 from './vec2';

export default class AABB {
  constructor(x, y, hw, hh) {
    this.position = new Vec2(x, y);
    this.halfSize = new Vec2(hw, hh);
  }

  get min() {
    const position = this.position;
    const halfSize = this.halfSize;

    return new Vec2(position.x - halfSize.x, position.y - halfSize.y);
  }

  get max() {
    const position = this.position;
    const halfSize = this.halfSize;

    return new Vec2(position.x + halfSize.x, position.y + halfSize.y);
  }

  get minX() {
    return this.position.x - this.halfSize.x;
  }

  get minY() {
    return this.position.y - this.halfSize.y;
  }

  get maxX() {
    return this.position.x + this.halfSize.x;
  }

  get maxY() {
    return this.position.y + this.halfSize.y;
  }

  set(x, y, hw, hh) {
    this.position.set(x, y);
    this.halfSize.set(hw, hh);

    return this;
  }

  setPosition(x, y) {
    this.position.set(x, y);

    return this;
  }

  setCenter(x, y) {
    this.position.set(x, y);

    return this;
  }

  setHalfSize(x, y) {
    this.halfSize.set(x, y);

    return this;
  }

  setSize(x, y) {
    this.halfSize.set(x * 2, y * 2);

    return this;
  }

  contains(vec) {
    const position = this.position;
    const halfSize = this.halfSize;
    const x = vec.x;
    const y = vec.y;

    return (
      x >= position.x - halfSize.x &&
      x <= position.x + halfSize.x &&
      y >= position.y - halfSize.y &&
      y <= position.y + halfSize.y
    );
  }
}
