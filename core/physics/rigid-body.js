import Vec2 from '../geom/vec2.js';

export default class RigidBody {
  constructor(gameObject) {
    this.gameObject = gameObject;
    this.position = new Vec2();
    this.velocity = new Vec2();

    this._force = new Vec2();
    this._mass = 1;
    this._invMass = 1;
  }

  get mass() {
    return this._mass;
  }

  set mass(value) {
    this._mass = value;

    if (value === 0) {
      this._invMass = 0;
    } else {
      this._invMass = 1 / value;
    }
  }

  get invMass() {
    return this._invMass;
  }

  addForce(force) {
    this._force.addVec(force);

    return this;
  }

  addForceXY(x, y) {
    this._force.add(x, y);

    return this;
  }

  fixedUpdate(dt) {
    if (this._mass === 0) {
      return;
    }

    const force = this._force.mul(this._invMass * dt);
    const velocity = this.velocity;

    velocity.addVec(force);
    this.position.add(velocity.x * dt, velocity.y * dt);

    force.setZero();
  }

  updateTransform() {
    const gameObject = this.gameObject;

    if (gameObject !== undefined) {
      gameObject.position = this.position;
    }
  }
}
