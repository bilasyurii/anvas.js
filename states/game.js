import State from '../core/state/state.js';
import Group from '../core/game-objects/group.js';
import Renderable from '../core/rendering/renderable.js';
import Math2 from '../core/utils/math2.js';
import RigidBody from '../core/physics/rigid-body.js';
import Circle from '../core/geom/circle.js';

export default class GameState extends State {
  onEnter() {
    const engine = this.engine;
    const group = new Group();

    group.position.set(200);

    const rect = new Rectangle();

    rect.x = 100;
    rect.y = 300;
    rect.degrees = 15;
    rect.pivot.set(50, 50);
    rect.localTransform.flipX();

    engine.time.events.loop(10, () => {
      rect.rotation += 0.01;
      rect.scaleX = Math.sin(engine.elapsed * 5) * 0.25 + 0.75;
    });

    engine.add(rect);
    engine.add(group);

    const event = engine.time.events.loop(50, (arg) => {
      console.log(arg);
    }, undefined, 5);

    function createCircle(radius, color, mass) {
      const bmd = engine.create.bitmap(300, 300);
      const spr = engine.add(engine.create.sprite(bmd));

      const ctx = bmd.ctx;

      ctx.arc(150, 150, 150, 0, Math2.PI2);
      ctx.fillStyle = color;
      ctx.fill();

      spr.width = radius * 2;
      spr.scale.y = spr.scale.x;

      spr.alignPivot();

      const rb = new RigidBody(spr);

      rb.mass = mass;
      rb.collider = new Circle(0, 0, radius);
      spr.rigidBody = rb;

      engine.physics.addRigidBody(rb);

      return spr;
    }

    const spr1 = createCircle(50, 'magenta', 2);
    const spr2 = createCircle(25, 'red', 1);

    spr1.position.set(300, 300);
    spr2.position.set(500, 300);

    spr1.rigidBody.addForceXY(16000, 8000);
    spr2.rigidBody.addForceXY(-4000, 2000);

    engine.time.events.once(500, () => {
      const sprite = engine.create.sprite('test');

      sprite.rotation = 20;
      sprite.addInput();

      engine.input.onDown.add(() => {
        sprite.input.toggle();
      });

      sprite.input.onOver.add(() => {
        sprite2.visible = false;    
      });

      sprite.input.onOut.add(() => {
        sprite2.visible = true;    
      });

      group.add(sprite);

      event.cancel();

      const bmd = engine.create.bitmap(100, 100);
      const sprite2 = engine.create.sprite(bmd);

      sprite2.pivot.set(50);

      group.add(sprite2);

      const ctx = bmd.ctx;

      ctx.arc(50, 50, 30, 0, Math2.PI2);
      ctx.fillStyle = 'green';
      ctx.fill();

      ctx.fillStyle = 'cyan';
      ctx.fillRect(50, 45, 45, 10);

      engine.time.events.loop(10, () => {
        sprite2.rotation += 0.05;

        sprite.right = sprite2.left;
        sprite.bottom = sprite2.top;

        rect.position.set(group.right, group.bottom);
      });
    });
  }
}

class Rectangle extends Renderable {
  render(ctx) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0, 0, 100, 100);
  }

  fixedUpdate() {
    // console.log(this.engine.dt);
  }
}
