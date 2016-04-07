import { List } from 'immutable'
import compileAttributes from './compile-attributes'
import schemaMapping from './schema-mapping'
import camelCase from './utils/camel-case'

/**
 * Compiler
 *
 * The compiler function consists of recursive function that traverses an AST
 * and returns the results of functions that map to each node 'type' in the
 * form configuration object.
 *
 * It keeps track of the position of each node in the AST as a `path`. Which is
 * a series of indices that correspond to the array positions.
 *
 * @param  {Store} store A Redux 'store' containing the abstract syntax tree
 * representing the form as an Immutable List. An example of the schema can be
 * found at [TBC]
 *
 * @param  {Object} formConfig The configuration for each
 *
 * @return {Array} An array representing the compiled form
 */
export default function compiler (store, formConfig) {
  /**
   * Called for each node in the abstract syntax tree (AST) that makes up the
   * state contained in the store. We identify the node by `type`
   *
   * @param  {ImmutableList} path A series of indices that defined the
   * contextual 'path' of a node in the AST. For example, `[0,1,0,1,1,3,0]`.
   * Stored as ImmutableList to avoid mutation issues while we recurse.
   *
   * @param  {ImmutableList} node The contextual node in the AST
   *
   * @param  {Integer} index The index of this node with respect to its siblings
   *
   * @return {Function} Result of the contextual function
   */
  const visit = (path, node, index) => {
    // Update the current path context
    path = path.push(index, 1)
    // Extract data from the AST based on the schema
    var type = node.get(schemaMapping.visit.type)
    var definition = node.get(schemaMapping.visit.definition)

    // Use the type to create a reference to a `visit` method
    // E.g., `field` -> `visitField(...)`
    var visitMethod = 'visit' + camelCase(type, true)
    return destinations[visitMethod](path, definition, index)
  }

  /**
   * A reference object so we can call our dynamic functions in `visit`
   * @type {Object}
   */
  const destinations = {

    /**
     * Called for each node that identifies as a field. Identifies the field
     * _type_ function from the `formConfig`
     *
     * @param  {ImmutableList} path A series of indices that defined the
     * contextual 'path' of a node in the AST. For example, `[0,1,0,1,1,3,0]`.
     * Stored as ImmutableList to avoid mutation issues while we recurse.
     *
     * @param  {ImmutableList} definition The list that defines the data related
     * to the field.
     *
     * @param  {Integer} index The index of this node with respect to its siblings
     *
     * @return {Function} Result of the relevant `fields[type]` function
     */
    visitField (path, definition, index) {
      let key = path.hashCode()
      let hashCode = definition.hashCode()
      let name = definition.get(schemaMapping.field.name)
      let type = camelCase(definition.get(schemaMapping.field.type))
      let value = definition.get(schemaMapping.field.value)
      let errors = definition.get(schemaMapping.field.errors)
      let attributes = compileAttributes(
        definition.get(schemaMapping.field.attributes)
      )
      let Field = formConfig.fields[type]
      if (typeof Field !== 'function') {
        throw new Error(`Expected the ${type} field handler to be a function.`)
      }
      return (
        Field({
          key,
          hashCode,
          path,
          store,
          type,
          name,
          value,
          errors,
          attributes
        })
      )
    },

    /**
     * Called for each node that identifies as an 'attr'. Attr is a wrapper
     * for a set of children, so it simply returns its `visit`ed children.
     *
     * @param  {ImmutableList} path A series of indices that defined the
     * contextual 'path' of a node in the AST. For example, `[0,1,0,1,1,3,0]`.
     * Stored as ImmutableList to avoid mutation issues while we recurse.
     *
     * @param  {ImmutableList} definition The list that defines the data related
     * to the attr block.
     *
     * @return {ImmutableList} A list of the attr block’s child nodes
     */
    visitAttr (path, definition) {
      let key = path.hashCode()
      let hashCode = definition.hashCode()
      let name = definition.get(schemaMapping.attr.name)
      let type = definition.get(schemaMapping.attr.type)
      let errors = definition.get(schemaMapping.attr.errors)
      let attributes = compileAttributes(
        definition.get(schemaMapping.attr.attributes)
      )
      let children = definition.get(schemaMapping.attr.children)
      path = path.push(schemaMapping.attr.children)
      let Attr = formConfig.attr
      if (typeof Attr !== 'function') {
        throw new Error('Expected the attr handler to be a function.')
      }
      return Attr({
        key,
        hashCode,
        name,
        type,
        errors,
        attributes,
        children: children.map(visit.bind(this, path))
      })
    },

    /**
     * Called for each node that identifies as a 'compound_field'. Compound
     * fields are essentially UI wrappers for a set of children, so it simply
     * returns its `visit`ed children.
     *
     * @param  {ImmutableList} path A series of indices that defined the
     * contextual 'path' of a node in the AST. For example, `[0,1,0,1,1,3,0]`.
     * Stored as ImmutableList to avoid mutation issues while we recurse.
     *
     * @param  {ImmutableList} definition The list that defines the data related
     * to the CompoundField block.
     *
     * @return {ImmutableList} A list of the CompoundField block’s child nodes
     */
    visitCompoundField (path, definition) {
      let key = path.hashCode()
      let hashCode = definition.hashCode()
      let type = definition.get(schemaMapping.compoundField.type)
      let attributes = compileAttributes(
        definition.get(schemaMapping.compoundField.attributes)
      )
      let children = definition.get(schemaMapping.compoundField.children)
      path = path.push(schemaMapping.compoundField.children)
      let CompoundField = formConfig.compoundField
      if (typeof CompoundField !== 'function') {
        throw new Error('Expected the CompoundField handler to be a function.')
      }
      return CompoundField({
        key,
        hashCode,
        type,
        attributes,
        children: children.map(visit.bind(this, path))
      })
    },

    /**
     * Called for each node that identifies as an 'many'.
     *
     * @param  {ImmutableList} path A series of indices that defined the
     * contextual 'path' of a node in the AST. For example, `[0,1,0,1,1,3,0]`.
     * Stored as ImmutableList to avoid mutation issues while we recurse.
     *
     * @param  {ImmutableList} definition The list that defines the data related
     * to the many block.
     *
     * @return {Function} Result of the relevant many function from the config
     * (including the result of its children)
     */
    visitMany (path, definition) {
      let key = path.hashCode()
      let hashCode = definition.hashCode()
      let name = definition.get(schemaMapping.many.name)
      let type = definition.get(schemaMapping.many.type)
      let errors = definition.get(schemaMapping.many.errors)
      let attributes = compileAttributes(
        definition.get(schemaMapping.many.attributes)
      )
      let template = definition.get(schemaMapping.many.template)
      let contents = definition.get(schemaMapping.many.contents)
      path = path.push(schemaMapping.many.contents)
      let children = contents.map((content, index) => {
        return content.map(visit.bind(this, path.push(index)))
      })
      let Many = formConfig.many
      if (typeof Many !== 'function') {
        throw new Error('Expected the many handler to be a function.')
      }
      return (
        Many({
          key,
          hashCode,
          name,
          type,
          errors,
          attributes,
          template,
          children
        })
      )
    },

    /**
     * Called for each node that identifies as an 'section'. Sections are
     * thought of as strong top-level (though they can be nested) wrappers for
     * other nodes.
     *
     * @param  {ImmutableList} path A series of indices that defined the
     * contextual 'path' of a node in the AST. For example, `[0,1,0,1,1,3,0]`.
     * Stored as ImmutableList to avoid mutation issues while we recurse.
     *
     * @param  {ImmutableList} definition The list that defines the data related
     * to the section block.
     *
     * @return {Function} Result of the relevant section function from the
     * config (including the result of its children)
     */
    visitSection (path, definition) {
      let key = path.hashCode()
      let hashCode = definition.hashCode()
      let name = definition.get(schemaMapping.section.name)
      let type = definition.get(schemaMapping.section.type)
      let attributes = compileAttributes(
        definition.get(schemaMapping.section.attributes)
      )
      let children = definition.get(schemaMapping.section.children)
      path = path.push(schemaMapping.section.children)
      if (!children) return
      let Section = formConfig.section
      if (typeof Section !== 'function') {
        throw new Error('Expected the section handler to be a function.')
      }
      return (
        Section({
          key,
          hashCode,
          name,
          type,
          attributes,
          children: children.map(visit.bind(this, path))
        })
      )
    },

    /**
     * Called for each node that identifies as an 'group'. Group are
     * thought of as light-weight groupings for other nodes.
     *
     * @param  {ImmutableList} path A series of indices that defined the
     * contextual 'path' of a node in the AST. For example, `[0,1,0,1,1,3,0]`.
     * Stored as ImmutableList to avoid mutation issues while we recurse.
     *
     * @param  {ImmutableList} definition The list that defines the data related
     * to the group block.
     *
     * @return {Function} Result of the relevant group function from the
     * config (including the result of its children)
     */
    visitGroup (path, definition) {
      let key = path.hashCode()
      let hashCode = definition.hashCode()
      let type = definition.get(schemaMapping.group.type)
      let attributes = compileAttributes(
        definition.get(schemaMapping.group.attributes)
      )
      let children = definition.get(schemaMapping.group.children)
      path = path.push(schemaMapping.group.children)
      if (!children) return
      let Group = formConfig.group
      if (typeof Group !== 'function') {
        throw new Error('Expected the group handler to be a function.')
      }
      return (
        Group({
          key,
          hashCode,
          type,
          attributes,
          children: children.map(visit.bind(this, path))
        })
      )
    }
  }

  // Map over the root nodes
  // We pass in an empty Immutable.List as `path` to kick things off
  let list = store.getState()
  return (List.isList(list)) ? list.map(visit.bind(this, List())) : false
}
