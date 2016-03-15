import { List, Map } from 'immutable'
import schemaMapping from './schema-mapping'
import camelCase from './utils/camel-case'

/**
 * Attributes compiler
 *
 * A recursive function that traverses a Formalist attributes-AST and compiles
 * it into an object-like and more usable shape.
 *
 * @param  {ImmutableList}
 *
 * @return {ImmutableMap} An Immutable.Map of the compiled attributes
 */
export default function compileAttributes (attributes) {
  function visit (node) {
    const type = camelCase(node.get(schemaMapping.attributes.visit.type), true)
    const definition = node.get(schemaMapping.attributes.visit.definition)
    return destinations['visit' + type](definition)
  }

  /**
   * A reference object so we can call our dynamic functions in `visit`
   * @type {Object}
   */
  const destinations = {

    /**
     * Called for each node that identifies as a object
     *
     * @param  {ImmutableList} definition The list that defines the data related
     * to the field.
     *
     * @return {Object} A compiled object
     */
    visitObject (definition) {
      // Create an Immutable Map
      return Map(definition.map(visitObjectChildren))
    },

    /**
     * Called for each node that identifies as an array
     *
     * @param  {ImmutableList} definition The list that defines the data related
     * to the field.
     *
     * @return {ImmutableList} A compiled list
     */
    visitArray (definition) {
      const children = definition.get(schemaMapping.attributes.array.children)
      return children.map(visit)
    },

    /**
     * Called for each node that identifies as a value
     *
     * @param  {String/Number/Boolean} definition The literal value
     */
    visitValue (definition) {
      return definition.get(schemaMapping.attributes.value)
    }
  }

  /**
   * Called for each node child of an object node
   *
   * @param  {Object} Reference object to mutate and return
   *
   * @param  {ImmutableList} pair The list that defines a pair of key/values
   * for the object
   *
   * @return {Object} The mutated reference object
   */
  function visitObjectChildren (pair) {
    const key = pair.get(schemaMapping.attributes.objectChildren.key)
    const children = pair.get(schemaMapping.attributes.objectChildren.children)
    return List([key, visit(children)])
  }

  /**
   * Visit the (singular) base attributes object
   */
  return visit(attributes)
}
