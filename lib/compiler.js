'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compiler;

var _immutable = require('immutable');

var _listToObject = require('./list-to-object');

var _listToObject2 = _interopRequireDefault(_listToObject);

var _schemaMapping = require('./schema-mapping');

var _schemaMapping2 = _interopRequireDefault(_schemaMapping);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function compiler(store, formConfig) {
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
  var visit = function visit(path, node, index) {
    // Update the current path context
    path = path.push(index, 1);
    // Extract data from the AST based on the schema
    var type = node.get(_schemaMapping2.default.visit.type);
    var definition = node.get(_schemaMapping2.default.visit.definition);

    // Use the type to create a reference to a `visit` method
    // E.g., `field` -> `visitField(...)`
    var visitMethod = 'visit' + type.charAt(0).toUpperCase() + type.slice(1);
    return destinations[visitMethod](path, definition, index);
  };

  /**
   * A reference object so we can call our dynamic functions in `visit`
   * @type {Object}
   */
  var destinations = {

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

    visitField: function visitField(path, definition, index) {
      var name = definition.get(_schemaMapping2.default.field.name);
      var type = definition.get(_schemaMapping2.default.field.type);
      var value = definition.get(_schemaMapping2.default.field.value);
      var config = definition.get(_schemaMapping2.default.field.config);
      var Field = formConfig.fields[type];
      if (typeof Field !== 'function') {
        throw new Error('Expected the ' + type + ' field handler to be a function.');
      }
      return Field({
        key: path,
        path: path,
        store: store,
        name: name,
        value: value,
        config: (0, _listToObject2.default)(config)
      });
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
    visitAttr: function visitAttr(path, definition) {
      var children = definition.get(_schemaMapping2.default.attr.children);
      path = path.push(_schemaMapping2.default.attr.children);
      return children.map(visit.bind(this, path));
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
    visitMany: function visitMany(path, definition) {
      var _this = this;

      var name = definition.get(_schemaMapping2.default.many.name);
      var contents = definition.get(_schemaMapping2.default.many.contents);
      path = path.push(_schemaMapping2.default.many.contents);
      var children = contents.map(function (content, index) {
        return content.map(visit.bind(_this, path.push(index)));
      }).flatten(1);
      var Many = formConfig.many;
      if (typeof Many !== 'function') {
        throw new Error('Expected the many handler to be a function.');
      }
      return Many({
        key: path.hashCode(),
        name: name,
        children: children
      });
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
    visitSection: function visitSection(path, definition) {
      var name = definition.get(_schemaMapping2.default.section.name);
      var children = definition.get(_schemaMapping2.default.section.children);
      path = path.push(_schemaMapping2.default.section.children);
      if (!children) return;
      var Section = formConfig.section;
      if (typeof Section !== 'function') {
        throw new Error('Expected the section handler to be a function.');
      }
      return Section({
        key: path.hashCode(),
        name: name,
        children: children.map(visit.bind(this, path))
      });
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
    visitGroup: function visitGroup(path, definition) {
      var _this2 = this;

      var contents = definition;
      if (!contents) return;
      var children = contents.map(function (content, index) {
        return content.map(visit.bind(_this2, path.push(index)));
      }).flatten(1);
      var Group = formConfig.group;
      if (typeof Group !== 'function') {
        throw new Error('Expected the group handler to be a function.');
      }
      return Group({
        key: path.hashCode(),
        children: children
      });
    }
  };

  // Map over the root nodes
  // We pass in an empty Immutable.List as `path` to kick things off
  var list = store.getState();
  return _immutable.List.isList(list) ? list.map(visit.bind(this, (0, _immutable.List)())) : false;
}