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
    rules: 3,
    errors: 4,
    attributes: 5
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
    contents: 5
  },
  section: {
    name: 0,
    config: 1,
    children: 2
  },
  attributes: {
    visit: {
      type: 0,
      definition: 1
    },
    objectChildren: {
      key: 0,
      children: 1
    },
    array: {
      children: 0
    },
    value: 0
  }
}

export default schemaMapping
