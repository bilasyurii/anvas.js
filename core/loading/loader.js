export default class Loader {
  constructor(cache) {
    this.engine = cache.engine;

    this._cache = cache;
    this._textures = cache.engine.textures;
  }

  loadImage(key, url) {
    const image = new Image();
    const this_ = this;

    image.onload = function() {
      image.onload = null;
      image.onerror = null;
      this_._onImageLoaded(key, image);
    };

    image.onerror = function() {
      image.onload = null;
      image.onerror = null;
      this_._onLoadingFailed(key, url);
    };

    image.src = url;

    if (image.complete === true && image.width && image.height) {
      image.onload = null;
      image.onerror = null;
      this._onImageLoaded(key, image);
    }
  }

  _onImageLoaded(key, image) {
    this._cache.addImage(key, image);

    const width = image.naturalWidth || image.width || 0;
    const height = image.naturalHeight || image.height || 0;

    this._textures.create(key, image, width, height);
  }

  _onLoadingFailed(key, url) {
    console.error(`Couldn't load file ${key} from URL: ${url}.`);
  }
}
