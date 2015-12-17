/**
 * A schema for mapping named keys for each type of object in the AST to their
 * relevant index. So we can know what we're talking about when we pull data
 * out of what are not-easy-for-humans data structure.
 * @type {Object}
 */
export default const schemaMapping = {
  visit: {
    type: 0,
    definition: 1
  },
  field: {
    name: 0,
    type: 1,
    value: 2,
    config: 3
  },
  attr: {
    name: 0,
    children: 1
  },
  many: {
    name: 0,
    contents: 1
  },
  section: {
    name: 0,
    children: 1
  }
}
