'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createFormConfig;
/**
 * Get a field based on type
 * @param  {Object} fields Object containing fields and their functions as
 * key/values
 * @param  {String} type The field type
 * @return {Function} The field render function
 */
function getField(fields, type) {
  var field = fields[type] || fields.default;
  if (typeof field !== 'function') {
    throw new Error('Could not resolve field: ' + type);
  }
  return field;
}

/**
 * Create a form configuration
 * @param  {Object} config Object describing the structure of the form
 * @return {Object} Accessors to get the form configuration based on component
 * type.
 */
function createFormConfig() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return {
    get: function get(componentType, type) {
      if (componentType === 'field') {
        if (config.fields == null) {
          throw new Error('Could not resolve fields configuration');
        }
        return getField(config.fields, type);
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