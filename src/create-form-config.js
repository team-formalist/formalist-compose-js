/**
 * Get a field based on type
 * @param  {Object} fields Object containing fields and their functions as
 * key/values
 * @param  {String} type The field type
 * @return {Function} The field render function
 */
function getField (fields, type) {
  const field = fields[type] || fields.default
  if (typeof field !== 'function') {
    throw new Error(`Could not resolve field: ${type}`)
  }
  return field
}

/**
 * Create a form configuration
 * @param  {Object} config Object describing the structure of the form
 * @return {Object} Accessors to get the form configuration based on component
 * type.
 */
export default function createFormConfig (config = {}) {
  return {
    get: function (componentType, type) {
      if (componentType === 'field') {
        if (config.fields == null) {
          throw new Error('Could not resolve fields configuration')
        }
        return getField(config.fields, type)
      } else {
        const component = config[componentType]
        if (typeof component !== 'function') {
          throw new Error(`Could not resolve component: ${componentType}`)
        }
        return component
      }
    },
  }
}
