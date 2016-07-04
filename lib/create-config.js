'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createConfig;
function getField(config, type) {
  var field = config[type] || config.default;
  if (typeof field !== 'function') {
    throw new Error('Could not resolve field: ' + type);
  }
  return field;
}

function createConfig() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return {
    get: function get(componentType, type) {
      if (componentType === 'field') {
        return getField(type);
      } else {
        var component = config[componentType];
        if (typeof component !== 'function') {
          throw new Error('Could not resolve component: ' + componentType);
        }
        return component;
      }
    }
  };
}