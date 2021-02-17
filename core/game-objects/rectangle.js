import Renderable from '../rendering/renderable.js';

export default class Rectangle extends Renderable {
  constructor() {
    super();
  }

  render(ctx) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0, 0, 100, 100);
  }

  fixedUpdate() {
    // console.log(this.engine.dt);
  }
}
