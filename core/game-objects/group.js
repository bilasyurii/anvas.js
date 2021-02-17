import ArrayUtils from '../utils/array-utils.js';
import GameObject from './game-object.js';

export default class Group extends GameObject {
  constructor() {
    super();

    this.children = [];
  }

  add(child) {
    this.children.push(child);

    const engine = this.engine;

    if (engine !== null) {
      child.engine = engine;
      child.onAddedToScene();
    }

    child.parent = this;
  }

  onAddedToScene() {
    const children = this.children;
    const count = children.length;
    const engine = this.engine;

    for (let i = 0; i < count; ++i) {
      const child = children[i];

      child.engine = engine;
      child.onAddedToScene();
    }
  }

  remove(child) {
    ArrayUtils.removeByValue(this.children, child);

    child.parent = null;
  }

  fixedUpdate() {
    const children = this.children;
    const count = children.length;

    for (let i = 0; i < count; ++i) {
      children[i].fixedUpdate();
    }
  }

  destroy() {
    const children = this.children;
    const count = children.length;

    for (let i = 0; i < count; ++i) {
      children[i].destroy();
    }

    this.children = null;
  }
}
