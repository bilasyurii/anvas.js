import Math2 from './math2.js';

export default class Vec2 {
  constructor(x, y) {
    if (x === undefined) {
      this.x = 0;
      this.y = 0;
    } else {
      this.x = x;

      if (y === undefined) {
        this.y = x;
      } else {
        this.y = y;
      }
    }
  }

  add(x, y) {
    this.x += x;
    this.y += y;

    return this;
  }

  addVec(vec) {
    this.x += vec.x;
    this.y += vec.y;

    return this;
  }

  sub(x, y) {
    this.x -= x;
    this.y -= y;

    return this;
  }

  subVec(vec) {
    this.x -= vec.x;
    this.y -= vec.y;

    return this;
  }

  mul(x, y) {
    this.x *= x;

    if (y === undefined) {
      this.y *= x;
    } else {
      this.y *= y;
    }

    return this;
  }

  mulVec(vec) {
    this.x *= vec.x;
    this.y *= vec.y;

    return this;
  }

  div(x, y) {
    this.x /= x;

    if (y === undefined) {
      this.y /= x;
    } else {
      this.y /= y;
    }

    return this;
  }

  divVec(vec) {
    this.x /= vec.x;
    this.y /= vec.y;

    return this;
  }

  length() {
    const x = this.x;
    const y = this.y;

    return Math.sqrt(x * x + y * y);
  }

  setLength(value) {
    this.normalize();

    this.x *= value;
    this.y *= value;

    return this;
  }

  lengthSqr() {
    const x = this.x;
    const y = this.y;

    return x * x + y * y;
  }

  manhattan() {
    return Math2.abs(this.x) + Math2.abs(this.y);
  }

  normalize() {
    const x = this.x;
    const y = this.y;
    const length = Math.sqrt(x * x + y * y);

    if (length === 0) {
      this.x = 1;
      this.y = 0;
    } else {
      this.x /= length;
      this.y /= length;
    }

    return this;
  }

  normalized() {
    const x = this.x;
    const y = this.y;
    const length = Math.sqrt(x * x + y * y);

    if (length === 0) {
      return new Vec2(1, 0);
    } else {
      return new Vec2(this.x / length, this.y / length);
    }
  }

  negate() {
    const x = this.x;
    const y = this.y;

    if (x !== 0) {
      this.x = 1 / x;
    }

    if (y !== 0) {
      this.y = 1 / y;
    }
  }

  negated() {
    const x = this.x;
    const y = this.y;

    return new Vec2(x === 0 ? 0 : 1 / x, y === 0 ? 0 : 1 / y);
  }

  invert() {
    this.x = 1 / this.x;
    this.y = 1 / this.y;
  }

  inverted() {
    return new Vec2(-this.x, -this.y);
  }

  radians() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }

  degrees() {
    return Math.atan2(-this.y, -this.x) * Math2.RAD2DEG + 180;
  }

  setRadians(value) {
    const length = this.length();
    const sin = Math.sin(value);
    const cos = Math.cos(value);

    this.x = cos * length;
    this.y = sin * length;
  }

  setDegrees(value) {
    value *= Math2.DEG2RAD;

    const length = this.length();
    const sin = Math.sin(value);
    const cos = Math.cos(value);

    this.x = cos * length;
    this.y = sin * length;
  }

  perpendicular() {
    return new Vec2(-this.y, this.x);
  }

  copyTo(vec) {
    vec.x = this.x;
    vec.y = this.y;
  }

  copyFrom(vec) {
    this.x = vec.x;
    this.y = vec.y;
  }

  set(x, y) {
    if (x === undefined) {
      this.x = 0;
      this.y = 0;
    } else {
      this.x = x;

      if (y === undefined) {
        this.y = x;
      } else {
        this.y = y;
      }
    }
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  setZero() {
    this.x = this.y = 0;
  }

  setFromRadians(angle, length) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    this.x = cos * length;
    this.y = sin * length;
  }

  setFromDegrees(angle, length) {
    angle *= Math2.DEG2RAD;

    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    this.x = cos * length;
    this.y = sin * length;
  }

  angleTo(vec) {
    return Math.atan2(y * vec.x - x * vec.y, x * vec.x + y * vec.y);
  }

  angleToDeg(vec) {
    return Math.atan2(y * vec.x - x * vec.y, x * vec.x + y * vec.y) * Math2.Rad2Deg;
  }

  dot(vec) {
    return x * vec.x + y * vec.y;
  }

  cross(vec) {
    return x * vec.y - y * vec.x;
  }

  isZero() {
    return this.x === 0 && this.y === 0;
  }

  clone() {
    return new Vec2(this.x, this.y);
  }

  distance(vec) {
    const dX = vec.x - this.x;
    const dY = vec.y - this.y;

    return Math.sqrt(dX * dX + dY * dY);
  }

  distanceSqr(vec) {
    const dX = vec.x - this.x;
    const dY = vec.y - this.y;

    return dX * dX + dY * dY;
  }

  manhattanDistance(vec) {
    return Math2.abs(vec.x - this.x) + Math2.abs(vec.y - this.y);
  }

  rotate(angle) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const prevX = x;

    this.x = this.y * cos + this.y * sin;
    this.y = this.y * cos - prevX * sin;

    return this;
  }

  rotated(angle) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const prevX = x;

    return new Vec2(this.y * cos + this.y * sin, this.y * cos - prevX * sin);
  }

  rotateAround(center, angle) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const dirX = this.x - center.x;
    const dirY = this.y - center.y;

    this.x = dirX * cos + dirY * sin + center.x;
    this.y = dirY * cos - dirX * sin + center.y;
  }

  rotateAroundThis(point, angle) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const x = this.x;
    const y = this.y;

    const dirX = point.x - x;
    const dirY = point.y - y;

    point.x = dirX * cos + dirY * sin + x;
    point.y = dirY * cos - dirX * sin + y;

    return point;
  }

  lerp(to, time) {
    x += (to.x - x) * time;
    y += (to.y - y) * time;
  }

  clamp(min, max) {
    x = Math.max(min, Math.min(max, x));
    y = Math.max(min, Math.min(max, y));
  }

  clamp2(minVec, maxVec) {
    x = Math.max(minVec.x, Math2.min(maxVec.x, x));
    y = Math.max(minVec.y, Math2.min(maxVec.y, y));
  }

  clampLength(min, max) {
    const currentLength = this.length();

    if (currentLength < min || currentLength > max) {
      Normalize();
      Multiply(Math.max(min, Math.min(max, currentLength)));
    }
  }

  floor() {
    this.x = Math.floor(x);
    this.y = Math.floor(y);
  }

  ceil() {
    this.x = Math.ceil(x);
    this.y = Math.ceil(y);
  }

  round() {
    this.x = Math.round(x);
    this.y = Math.round(y);
  }

  equals(vec) {
    return this.x === vec.x && this.y === vec.y;
  }

  equalsEps(vec, eps) {
    return Math2.abs(x - vec.x) <= eps && Math2.abs(y - vec.y) <= eps;
  }

  toString() {
    return this.x + ' ' + this.y;
  }

  hash() {
    return ~~(x * y + x + y);
  }

  static longer(a, b) {
    return (b.lengthSqr() > a.lengthSqr()) ? b : a;
  }

  static shorter(a, b) {
    return (b.lengthSqr() < a.lengthSqr()) ? b : a;
  }

  static fromRadians(angle, length) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    return new Vec2(cos * length, sin * length);
  }

  static fromDegrees(angle, length) {
    angle *= Math2.RAD2DEG;

    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    return new Vec2(cos * length, sin * length);
  }

  static lerp(a, b, time) {
    const aX = a.x;
    const aY = a.y;

    return new Vec2(aX + (b.x - aX) * time, aY + (b.y - aY) * time);
  }

  static angleBetween(a, b) {
    const dot = a.x * b.x + a.y * b.y;

    return Math.acos(dot / (a.length() * b.length()));
  }
}

Vec2.zero = new Vec2(0, 0);
Vec2.left = new Vec2(-1, 0);
Vec2.right = new Vec2(1, 0);
Vec2.up = new Vec2(0, -1);
Vec2.down = new Vec2(0, 1);