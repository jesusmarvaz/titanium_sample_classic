if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') {
  module.exports = TiMap = require('ti.googlemaps');
} else {
  module.exports = TiMap = require('ti.map');
}