import Math2 from '../utils/math2.js';
import Vec2 from './vec2.js';

export default class ObservableVec2 {
  constructor(callback, context, x, y) {
    this.callback = callback;
    this.context = context;

    if (x === undefined) {
      this._x = 0;
      this._y = 0;
    } else {
      this._x = x;

      if (y === undefined) {
        this._y = x;
      } else {
        this._y = y;
      }
    }
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;

    this.callback.call(this.context);
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;

    this.callback.call(this.context);
  }

  onChange() {
    this.callback.call(this.context);
  }

  add(x, y) {
    this._x += x;
    this._y += y;

    this.callback.call(this.context);

    return this;
  }

  addVec(vec) {
    this._x += vec.x;
    this._y += vec.y;

    this.callback.call(this.context);

    return this;
  }

  sub(x, y) {
    this._x -= x;
    this._y -= y;

    this.callback.call(this.context);

    return this;
  }

  subVec(vec) {
    this._x -= vec.x;
    this._y -= vec.y;

    this.callback.call(this.context);

    return this;
  }

  mul(x, y) {
    this._x *= x;

    if (y === undefined) {
      this._y *= x;
    } else {
      this._y *= y;
    }

    this.callback.call(this.context);

    return this;
  }

  mulVec(vec) {
    this._x *= vec.x;
    this._y *= vec.y;

    this.callback.call(this.context);

    return this;
  }

  div(x, y) {
    this._x /= x;

    if (y === undefined) {
      this._y /= x;
    } else {
      this._y /= y;
    }

    this.callback.call(this.context);

    return this;
  }

  divVec(vec) {
    this._x /= vec.x;
    this._y /= vec.y;

    this.callback.call(this.context);

    return this;
  }

  length() {
    const x = this._x;
    const y = this._y;

    return Math.sqrt(x * x + y * y);
  }

  lengthSqr() {
    const x = this._x;
    const y = this._y;

    return x * x + y * y;
  }

  manhattan() {
    return Math2.abs(this._x) + Math2.abs(this._y);
  }

  normalize() {
    const x = this._x;
    const y = this._y;
    const length = Math.sqrt(x * x + y * y);

    if (length === 0) {
      this._x = 1;
      this._y = 0;
    } else {
      this._x /= length;
      this._y /= length;
    }

    this.callback.call(this.context);

    return this;
  }

  normalized() {
    const x = this._x;
    const y = this._y;
    const length = Math.sqrt(x * x + y * y);

    if (length === 0) {
      return new Vec2(1, 0);
    } else {
      return new Vec2(this._x / length, this._y / length);
    }
  }

  negate() {
    const x = this._x;
    const y = this._y;

    if (x !== 0) {
      this._x = 1 / x;
    }

    if (y !== 0) {
      this._y = 1 / y;
    }

    this.callback.call(this.context);
  }

  negated() {
    const x = this._x;
    const y = this._y;

    return new Vec2(x === 0 ? 0 : 1 / x, y === 0 ? 0 : 1 / y);
  }

  invert() {
    this._x = 1 / this._x;
    this._y = 1 / this._y;

    this.callback.call(this.context);
  }

  inverted() {
    return new Vec2(-this._x, -this._y);
  }

  radians() {
    return Math.atan2(-this._y, -this._x) + Math.PI;
  }

  degrees() {
    return Math.atan2(-this._y, -this._x) * Math2.RAD2DEG + 180;
  }

  setRadians(value) {
    const length = this.length();
    const sin = Math.sin(value);
    const cos = Math.cos(value);

    this._x = cos * length;
    this._y = sin * length;

    this.callback.call(this.context);
  }

  setDegrees(value) {
    value *= Math2.DEG2RAD;

    const length = this.length();
    const sin = Math.sin(value);
    const cos = Math.cos(value);

    this._x = cos * length;
    this._y = sin * length;

    this.callback.call(this.context);
  }

  perpendicular() {
    return new Vec2(-this._y, this._x);
  }

  copyTo(vec) {
    vec.set(this._x, this._y);
  }

  copyFrom(vec) {
    this._x = vec.x;
    this._y = vec.y;

    this.callback.call(this.context);
  }

  set(x, y) {
    if (x === undefined) {
      this._x = 0;
      this._y = 0;
    } else {
      this._x = x;

      if (y === undefined) {
        this._y = x;
      } else {
        this._y = y;
      }
    }

    this.callback.call(this.context);
  }

  setX(x) {
    this._x = x;

    this.callback.call(this.context);
  }

  setY(y) {
    this._y = y;

    this.callback.call(this.context);
  }

  setZero() {
    this._x = this._y = 0;

    this.callback.call(this.context);
  }

  setFromRadians(angle, length) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    this._x = cos * length;
    this._y = sin * length;

    this.callback.call(this.context);
  }

  setFromDegrees(angle, length) {
    angle *= Math2.DEG2RAD;

    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    this._x = cos * length;
    this._y = sin * length;

    this.callback.call(this.context);
  }

  angleTo(vec) {
    const x = this._x;
    const y = this._y;
  
    return Math.atan2(y * vec.x - x * vec.y, x * vec.x + y * vec.y);
  }

  angleToDeg(vec) {
    const x = this._x;
    const y = this._y;

    return Math.atan2(y * vec.x - x * vec.y, x * vec.x + y * vec.y) * Math2.Rad2Deg;
  }

  dot(vec) {
    return this._x * vec.x + this._y * vec.y;
  }

  cross(vec) {
    return this._x * vec.y - this._y * vec.x;
  }

  isZero() {
    return this._x === 0 && this._y === 0;
  }

  clone(callback, context) {
    if (callback === undefined) {
      callback = this.callback;
    }

    if (context === undefined) {
      context = this.context;
    }

    return new ObservableVec2(callback, context, this._x, this._y);
  }

  distance(vec) {
    const dX = vec.x - this._x;
    const dY = vec.y - this._y;

    return Math.sqrt(dX * dX + dY * dY);
  }

  distanceSqr(vec) {
    const dX = vec.x - this._x;
    const dY = vec.y - this._y;

    return dX * dX + dY * dY;
  }

  manhattanDistance(vec) {
    return Math2.abs(vec.x - this._x) + Math2.abs(vec.y - this._y);
  }

  rotate(angle) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const prevX = x;

    this._x = this._y * cos + this._y * sin;
    this._y = this._y * cos - prevX * sin;

    this.callback.call(this.context);

    return this;
  }

  rotated(angle) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const prevX = x;

    return new Vec2(this._y * cos + this._y * sin, this._y * cos - prevX * sin);
  }

  rotateAround(center, angle) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const dirX = this._x - center.x;
    const dirY = this._y - center.y;

    this._x = dirX * cos + dirY * sin + center.x;
    this._y = dirY * cos - dirX * sin + center.y;

    this.callback.call(this.context);
  }

  rotateAroundThis(point, angle) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const x = this._x;
    const y = this._y;

    const dirX = point.x - x;
    const dirY = point.y - y;

    point.set(
      dirX * cos + dirY * sin + x,
      dirY * cos - dirX * sin + y
    );

    return point;
  }

  lerp(to, time) {
    x += (to.x - x) * time;
    y += (to.y - y) * time;

    this.callback.call(this.context);
  }

  clamp(min, max) {
    x = MathF.Max(min, MathF.Min(max, x));
    y = MathF.Max(min, MathF.Min(max, y));

    this.callback.call(this.context);
  }

  clamp2(minVec, maxVec) {
    x = MathF.Max(minVec.x, MathF.Min(maxVec.x, x));
    y = MathF.Max(minVec.y, MathF.Min(maxVec.y, y));

    this.callback.call(this.context);
  }

  clampLength(min, max) {
    var currentLength = Length;

    Normalize();
    Multiply(MathF.Max(min, MathF.Min(max, currentLength)));
  }

  floor() {
    this._x = Math.floor(x);
    this._y = Math.floor(y);

    this.callback.call(this.context);
  }

  ceil() {
    this._x = Math.ceil(x);
    this._y = Math.ceil(y);

    this.callback.call(this.context);
  }

  round() {
    this._x = Math.round(x);
    this._y = Math.round(y);

    this.callback.call(this.context);
  }

  equals(vec) {
    return this._x === vec.x && this._y === vec.y;
  }

  equalsEps(vec, eps) {
    return Math2.abs(x - vec.x) <= eps && Math2.abs(y - vec.y) <= eps;
  }

  toString() {
    return this._x + ' ' + this._y;
  }

  hash() {
    return ~~(x * y + x + y);
  }

  destroy() {
    this.callback = null;
    this.context = null;
  }
}
