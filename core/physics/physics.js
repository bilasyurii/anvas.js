export default class Physics {
  constructor(engine) {
    this.engine = engine;
    this.dt = engine.dt;

    this._forceGenerators = [];
    this._rigidBodies = [];
  }

  addRigidBody(body) {
    this._rigidBodies.push(body);
  }

  addForceGenerator(forceGenerator) {
    this._forceGenerators.push(forceGenerator);

    forceGenerator.setRigidBodies(this._rigidBodies);
  }

  fixedUpdate() {
    const dt = this.dt;

    const forceGenerators = this._forceGenerators;
    let count = forceGenerators.length;

    for (let i = 0; i < count; ++i) {
      forceGenerators[i].fixedUpdate(dt);
    }

    const bodies = this._rigidBodies;
    count = bodies.length;

    for (let i = 0; i < count; ++i) {
      bodies[i].fixedUpdate(dt);
    }
  }

  postUpdate() {
    const bodies = this._rigidBodies;
    const count = bodies.length;

    for (let i = 0; i < count; ++i) {
      bodies[i].updateTransform();
    }
  }
}
