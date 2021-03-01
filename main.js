import Engine from './core/engine.js';
import Group from './core/game-objects/group.js';
import Renderable from './core/rendering/renderable.js';
import Math2 from './core/utils/math2.js';

function preload(loader) {
  loader.loadImage('test', 'assets/test.png');
}

const engine = new Engine()
  .setCanvasId('canvas')
  .setBodyColor('#222222')
  .setCanvasColor('#000000')
  .setPreloader(preload)
  .start();

class Rectangle extends Renderable {
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

  // ctx.fillStyle = 'gray';
  // ctx.fillRect(0, 0, 100, 100);
  ctx.arc(50, 50, 30, 0, Math2.PI2);
  ctx.fillStyle = 'green';
  ctx.fill();

  ctx.fillStyle = 'cyan';
  ctx.fillRect(50, 45, 45, 10);

  engine.time.events.loop(10, () => {
    sprite2.rotation += 0.05;

    sprite.right = sprite2.left;
    sprite.bottom = sprite2.top;
    // sprite.position.set(sprite2.right, sprite2.bottom);

    rect.position.set(group.right, group.bottom);
    // rect.position.set(sprite.getBounds().maxX, sprite.getBounds().maxY);
  });

  // engine.time.events.loop(1000, () => {
  //   sprite2.visible = !sprite2.visible;
  // });
});

// engine.input.onDown.add((x, y) => {
//   console.log('down: ', x, y);
// });
