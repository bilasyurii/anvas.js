import Debug from '../debug/debug.js';
import Vec2 from '../geom/vec2.js';
import Math2 from '../utils/math2.js';
import CollisionData from './collision-data.js';

export default class Collisions {
  constructor() {
    Debug.staticClass();
  }

  static checkCollision(a, b) {
    if (a.isCircle === true && b.isCircle === true) {
      return Collisions.circle2circle(a, b);
    } else {
      console.error(a, b);
      Debug.fail('Unknown collider');
    }
  }

  static circle2circle(a, b) {
    const aR = a.radius;
    const aX = a.x;
    const aY = a.y;
    const radiuses = aR + b.radius;
    const dx = b.x - aX;
    const dy = b.y - aY;

    const distanceSqr = dx * dx + dy * dy;

    if (distanceSqr - radiuses * radiuses > 0) {
      return new CollisionData();
    }

    const distance = Math.sqrt(distanceSqr);
    const depth = Math2.abs(distance - radiuses) * 0.5;
    const distanceInv = 1 / distance;
    const normal = new Vec2(dx * distanceInv, dy * distanceInv);
    const distanceToPoint = aR - depth;
    const contact = new Vec2(aX, aY)
      .add(normal.x * distanceToPoint, normal.y * distanceToPoint);

    return new CollisionData(normal, depth)
      .addContact(contact);
  }
}
