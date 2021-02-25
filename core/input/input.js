import Observable from '../events/observable.js';
import Touch from './touch.js';
import Mouse from './mouse.js';
import SU from '../screen/screen-utils.js';

export default class Input {
  constructor(engine) {
    this.engine = engine;

    this.touch = new Touch(engine);
    this.mouse = new Mouse(engine);

    this.onDown = new Observable();
    this.onUp = new Observable();
    this.onMove = new Observable();

    this.inputHandlers = [];

    this.realX = 0;
    this.realY = 0;

    this.x = 0;
    this.y = 0;

    this.prevX = 0;
    this.prevY = 0;

    this.movementX = 0;
    this.movementY = 0;

    this.event = null;

    this._canvas = engine.canvas;

    this._setupEvents();
  }

  disableAll() {
    this.touch.enabled = false;
    this.mouse.enabled = false;
  }

  destroy() {
    this.mouse.destroy();
    this.touch.destroy();
  }

  _setupEvents() {
    const mouse = this.mouse;

    mouse.onDown.add(this._onDown, this);
    mouse.onUp.add(this._onUp, this);
    mouse.onMove.add(this._onMove, this);

    const touch = this.touch;

    touch.onTouchStart.add(this._onDown, this);
    touch.onTouchEnd.add(this._onUp, this);
    touch.onTouchMove.add(this._onMove, this);
  }

  _onDown(event) {
    this._handleEvent(event);

    this.onDown.post(this.x, this.y);
  }

  _onUp(event) {
    this._handleEvent(event);

    this.onUp.post(this.x, this.y);
  }

  _onMove(event) {
    this._handleEvent(event);

    this.onMove.post(this.x, this.y);
  }

  _handleEvent(event) {
    this.event = event;

    const prevX = this.prevX = this.x;
    const prevY = this.prevY = this.y;

    this.realX = event.offsetX;
    this.realY = event.offsetY;

    const scaleInv = SU.scaleInv;

    const x = this.x = this.realX * scaleInv;
    const y = this.y = this.realY * scaleInv;

    this.movementX = x - prevX;
    this.movementY = y - prevY;
  }
}
