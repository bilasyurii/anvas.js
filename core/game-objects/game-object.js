import Math2 from '../utils/math2.js';
import ObservableVec2 from '../utils/observable-vec2.js';
import Transform from '../utils/transform.js';

export default class GameObject {
  constructor() {
    this.engine = null;

    this._local = new Transform();
    this._world = new Transform();

    this._parent = null;

    this._dirty = true;
    this._worldDirty = true;

    this._position = new ObservableVec2(this._onChange, this, 0, 0);
    this._scale = new ObservableVec2(this._onChange, this, 1, 1);
    this._pivot = new ObservableVec2(this._onChange, this, 0, 0);
    this._rotation = 0;
  }

  onAddedToScene() {
  }

  fixedUpdate() {
    // can be overridden in derived classes
  }

  updateLocalTransform() {
    const rotation = this._rotation;

    const sin = Math.sin(-rotation);
    const cos = Math.cos(rotation);

    const scale = this._scale;

    const a = scale.x * cos;
    const b = scale.x * sin;
    const c = scale.y * sin;
    const d = scale.y * cos;

    const pivot = this._pivot;
    const position = this._position;

    const tx = -pivot.x * a - pivot.y * c + position.x;
    const ty = pivot.x * b - pivot.y * d + position.y;

    this._local.set(
      a, -b, tx,
      c, d, ty
    );

    this._dirty = false;
  }

  forceUpdateTransform() {
    this.updateLocalTransform();

    const parent = this._parent;

    if (parent === null) {
      this._world.copyFrom(this._local);
    } else {
      const world = this._world;

      world.copyFrom(parent._world);
      world.combine(this._local);
    }

    this._worldDirty = false;
  }

  recursiveUpdateTransform() {
    const parent = this._parent;

    if (this._dirty === true) {
      this.updateLocalTransform();

      const world = this._world;

      if (parent === null) {
        world.setIdentity();
      } else {
        if (parent.worldDirty === true) {
          parent.recursiveUpdateTransform();
        }

        world.copyFrom(parent._world);
      }

      world.combine(this._local);

      this._worldDirty = false;
    } else if (parent !== null && parent.worldDirty === true) {
      parent.recursiveUpdateTransform();

      const world = this._world;

      world.copyFrom(parent._world);
      world.combine(this._local);

      this._worldDirty = false;
    } 
  }

  setTransform(x = 0, y = 0, scaleX = 1, scaleY = 1, rotation = 0, pivotX = 0, pivotY = 0) {
    this._rotation = rotation;
    this.position.set(x, y);
    this.scale.set(scaleX, scaleY);
    this.pivot.set(pivotX, pivotY);

    return this;
  }

  destroy() {}

  get parent() {
    return this._parent;
  }

  set parent(value) {
    this._parent = value;
    this._worldDirty = true;
  }

  get dirty() {
    return this._dirty;
  }

  get worldDirty() {
    if (this._worldDirty === true || this._dirty === true) {
      return true;
    }

    const parent = this._parent;

    return (parent !== null && parent.worldDirty === true);
  }

  get x() {
    return this._position.x;
  }

  set x(value) {
    this._position.x = value;
  }

  get y() {
    return this._position.y;
  }

  set y(value) {
    this._position.y = value;
  }

  get scaleX() {
    return this._scale.x;
  }

  set scaleX(value) {
    this._scale.x = value;
  }

  get scaleY() {
    return this._scale.y;
  }

  set scaleY(value) {
    this._scale.y = value;
  }

  get pivotX() {
    return this._pivot.x;
  }

  set pivotX(value) {
    this._pivot.x = value;
  }

  get pivotY() {
    return this._pivot.y;
  }

  set pivotY(value) {
    this._pivot.y = value;
  }

  get rotation() {
    return this._rotation;
  }

  set rotation(value) {
    this._rotation = value;
    this._dirty = true;
  }

  get degrees() {
    return this._rotation * Math2.RAD2DEG;
  }

  set degrees(value) {
    this._rotation = value * Math2.DEG2RAD;
    this._dirty = true;
  }

  get position() {
    return this._position;
  }

  set position(value) {
    this._position.copyFrom(value);
  }

  get scale() {
    return this._scale;
  }

  set scale(value) {
    this._scale.copyFrom(value);
  }

  get pivot() {
    return this._pivot;
  }

  set pivot(value) {
    this._pivot.copyFrom(value);
  }

  get localTransform() {
    return this._local;
  }

  set localTransform(value) {
    this._local.copyFrom(value);
  }

  get worldTransform() {
    return this._world;
  }

  set worldTransform(value) {
    this._world.copyFrom(value);
  }

  _onChange() {
    this._dirty = true;
  }
}
