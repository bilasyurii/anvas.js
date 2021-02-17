import Renderable from '../rendering/renderable.js';

export default class Sprite extends Renderable {
  constructor(texture = null, frameName = null, frame = null) {
    super();

    if (texture.isBitmap === true) {
      texture = texture.texture;
    }

    this._texture = texture;

    if (texture === null || texture === undefined) {
      this._frameName = undefined;
      this._frame = undefined;
    } else if (frameName === null) {
      this._frameName = null;
      this._frame = texture.defaultFrame;
    } else {
      this._frameName = frameName;

      if (frame === null) {
        this._frame = texture.get(frameName);
      } else {
        this._frame = frame;
      }
    }
  }

  get texture() {
    return this._texture;
  }

  set texture(value) {
    if (this._texture === value) {
      return;
    }

    this._texture = value;
    this._frameName = undefined;

    if (value !== null && value !== undefined) {
      this._frame = value.defaultFrame;
    }
  }

  get frameName() {
    return this._frameName;
  }

  set frameName(value) {
    this._frameName = value;

    const texture = this._texture

    if (texture !== null && texture !== undefined) {
      this._frame = texture.get(value);
    }
  }

  get frame() {
    return this._frame.clone();
  }

  render(ctx) {
    const frame = this._frame;

    if (frame !== undefined) {
      const w = frame.w;
      const h = frame.h;
  
      ctx.drawImage(this._texture.source, frame.x, frame.y, w, h, 0, 0, w, h);
    } 
  }

  destroy() {
    this._texture = null;
    this._frame = null;
    this._frameName = null;
  }
}
