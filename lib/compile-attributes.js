'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compileAttributes;

var _immutable = require('immutable');

var _schemaMapping = require('./schema-mapping');

var _schemaMapping2 = _interopRequireDefault(_schemaMapping);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function compileAttributes(attributes) {
  function visit(node) {
    var type = node.get(_schemaMapping2.default.attributes.visit.type);
    var definition = node.get(_schemaMapping2.default.attributes.visit.definition);
    return destinations['visit' + type.charAt(0).toUpperCase() + type.slice(1)](definition);
  }

  /**
   * A reference object so we can call our dynamic functions in `visit`
   * @type {Object}
   */
  var destinations = {

    /**
     * Called for each node that identifies as a object
     *
     * @param  {ImmutableList} definition The list that defines the data related
     * to the field.
     *
     * @return {Object} A compiled object
     */

    visitObject: function visitObject(definition) {
      // Create an Immutable Map
      return (0, _immutable.Map)(definition.map(visitObjectChildren));
    },

    /**
     * Called for each node that identifies as an array
     *
     * @param  {ImmutableList} definition The list that defines the data related
     * to the field.
     *
     * @return {ImmutableList} A compiled list
     */
    visitArray: function visitArray(definition) {
      var children = definition.get(_schemaMapping2.default.attributes.array.children);
      return children.map(visit);
    },

    /**
     * Called for each node that identifies as a value
     *
     * @param  {String/Number/Boolean} definition The literal value
     */
    visitValue: function visitValue(definition) {
      return definition.get(_schemaMapping2.default.attributes.value);
    }
  };

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
  function visitObjectChildren(pair) {
    var key = pair.get(_schemaMapping2.default.attributes.objectChildren.key);
    var children = pair.get(_schemaMapping2.default.attributes.objectChildren.children);
    return (0, _immutable.List)([key, visit(children)]);
  }

  /**
   * Visit the (singular) base attributes object
   */
  return visit(attributes);
}