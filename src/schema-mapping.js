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
    value: 2,
    errors: 3,
    config: 4
  },
  attr: {
    name: 0,
    children: 1,
    errors: 2
  },
  many: {
    name: 0,
    contents: 1,
    errors: 2
  },
  section: {
    name: 0,
    children: 1
  }
}

export default schemaMapping
