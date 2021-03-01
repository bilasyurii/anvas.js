export default class Math2 {
  static randomRanged(min, max) {
    return Math.random() * (max - min) + min;
  }

  static sign(value) {
    if (value < 0) {
      return -1;
    }

    return 1;
  }

  static randomSign() {
    return Math.random() < 0.5 ? 1 : -1;
  }

  static lerp(a, b, t) {
    return a + (b - a) * t;
  }

  static clamp(value, min, max) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    }

    return value;
  }

  static hypot2(x, y) {
    return Math.sqrt(x * x + y * y);
  }

  static vectorAngle(vector) {
    return Math.atan2(vector.y, vector.x);
  }

  static chance(probability) {
    return Math.random() < probability;
  }

  static max(a, b) {
    return a > b ? a : b;
  }

  static min(a, b) {
    return a < b ? a : b;
  }

  static abs(a) {
    return a < 0 ? -a : a;
  }
}

Math2.RAD2DEG = 180 / Math.PI;

Math2.DEG2RAD = Math.PI / 180;

Math2.PI2 = Math.PI * 2;

Math2.PI05 = Math.PI * 0.5;
