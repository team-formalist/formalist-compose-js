/**
 * A schema for mapping named keys for each type of object in the AST to their
 * relevant index. So we can know what we're talking about when we pull data
 * out of what are not-easy-for-humans data structure.
 * @type {Object}
 */
const schemaMapping = {
  visit: {
    type: 0,
    definition: 1
  },
  field: {
    name: 0,
    type: 1,
    displayVariant: 2,
    value: 3,
    rules: 4,
    errors: 5,
    config: 6
  },
  attr: {
    name: 0,
    rules: 1,
    errors: 2,
    children: 3
  },
  many: {
    name: 0,
    rules: 1,
    errors: 2,
    config: 3,
    template: 4,
    contents: 5,
  },
  section: {
    name: 0,
    config: 1,
    children: 2
  }
}

export default schemaMapping
