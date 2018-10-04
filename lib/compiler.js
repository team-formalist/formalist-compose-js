'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compiler;

var _immutable = require('immutable');

var _compileAttributes = require('./compile-attributes');

var _compileAttributes2 = _interopRequireDefault(_compileAttributes);

var _schemaMapping = require('./schema-mapping');

var _schemaMapping2 = _interopRequireDefault(_schemaMapping);

var _camelCase = require('./utils/camel-case');

var _camelCase2 = _interopRequireDefault(_camelCase);

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
 * @param  {Store} store A Redux store containing the abstract syntax tree
 * representing the form as an Immutable List.
 *
 * @param {EventEmitter} bus A single bus for internal events within the form
 * instance.
 *
 * @param  {Object} formConfig The configuration for each component.
 *
 * @return {Array} An array representing the compiled form.
 */
function compiler(store, bus, formConfig) {
  var _this6 = this;

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
  var visit = function visit(_ref) {
    var path = _ref.path,
        namePath = _ref.namePath,
        node = _ref.node,
        index = _ref.index;

    // Update the current path context
    path = path.push(index, 1);
    // Extract data from the AST based on the schema
    var type = node.get(_schemaMapping2.default.visit.type);
    var definition = node.get(_schemaMapping2.default.visit.definition);

    // Use the type to create a reference to a `visit` method
    // E.g., `field` -> `visitField(...)`
    var visitMethod = 'visit' + (0, _camelCase2.default)(type, true);
    return destinations[visitMethod]({ path: path, namePath: namePath, definition: definition, index: index });
  };

  function appendNamePath(namePath, addition) {
    return namePath != null ? namePath + '.' + addition : addition;
  }

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
    visitField: function visitField(_ref2) {
      var path = _ref2.path,
          namePath = _ref2.namePath,
          definition = _ref2.definition,
          index = _ref2.index;

      var key = path.hashCode();
      var hashCode = definition.hashCode();
      var name = definition.get(_schemaMapping2.default.field.name);
      var type = (0, _camelCase2.default)(definition.get(_schemaMapping2.default.field.type));
      var value = definition.get(_schemaMapping2.default.field.value);
      var errors = definition.get(_schemaMapping2.default.field.errors);
      var attributes = (0, _compileAttributes2.default)(definition.get(_schemaMapping2.default.field.attributes));
      namePath = appendNamePath(namePath, name);
      console.log("field", namePath);
      var Field = formConfig.get('field', type);
      if (typeof Field !== 'function') {
        throw new Error('Expected the ' + type + ' field handler to be a function.');
      }
      return Field({
        key: key,
        hashCode: hashCode,
        path: path,
        namePath: namePath,
        store: store,
        bus: bus,
        type: type,
        name: name,
        value: value,
        errors: errors,
        attributes: attributes
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
    visitAttr: function visitAttr(_ref3) {
      var _this = this;

      var path = _ref3.path,
          namePath = _ref3.namePath,
          definition = _ref3.definition;

      var key = path.hashCode();
      var hashCode = definition.hashCode();
      var name = definition.get(_schemaMapping2.default.attr.name);
      var type = definition.get(_schemaMapping2.default.attr.type);
      var errors = definition.get(_schemaMapping2.default.attr.errors);
      var attributes = (0, _compileAttributes2.default)(definition.get(_schemaMapping2.default.attr.attributes));
      var children = definition.get(_schemaMapping2.default.attr.children);
      namePath = appendNamePath(namePath, name);
      path = path.push(_schemaMapping2.default.attr.children);
      var Attr = formConfig.get('attr');
      if (typeof Attr !== 'function') {
        throw new Error('Expected the attr handler to be a function.');
      }
      return Attr({
        key: key,
        hashCode: hashCode,
        name: name,
        type: type,
        errors: errors,
        attributes: attributes,
        children: children.map(function (node, index) {
          return visit.call(_this, { path: path, namePath: namePath, node: node, index: index });
        })
      });
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
    visitCompoundField: function visitCompoundField(_ref4) {
      var _this2 = this;

      var path = _ref4.path,
          namePath = _ref4.namePath,
          definition = _ref4.definition;

      var key = path.hashCode();
      var hashCode = definition.hashCode();
      var type = definition.get(_schemaMapping2.default.compoundField.type);
      var attributes = (0, _compileAttributes2.default)(definition.get(_schemaMapping2.default.compoundField.attributes));
      var children = definition.get(_schemaMapping2.default.compoundField.children);
      path = path.push(_schemaMapping2.default.compoundField.children);
      var CompoundField = formConfig.get('compoundField');
      if (typeof CompoundField !== 'function') {
        throw new Error('Expected the CompoundField handler to be a function.');
      }
      return CompoundField({
        key: key,
        hashCode: hashCode,
        type: type,
        attributes: attributes,
        children: children.map(function (node, index) {
          return visit.call(_this2, { path: path, namePath: namePath, node: node, index: index });
        })
      });
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
    visitMany: function visitMany(_ref5) {
      var _this3 = this;

      var path = _ref5.path,
          namePath = _ref5.namePath,
          definition = _ref5.definition;

      var key = path.hashCode();
      var hashCode = definition.hashCode();
      var name = definition.get(_schemaMapping2.default.many.name);
      var type = definition.get(_schemaMapping2.default.many.type);
      var errors = definition.get(_schemaMapping2.default.many.errors);
      var attributes = (0, _compileAttributes2.default)(definition.get(_schemaMapping2.default.many.attributes));
      var template = definition.get(_schemaMapping2.default.many.template);
      var contents = definition.get(_schemaMapping2.default.many.contents);
      var contentsPath = path.push(_schemaMapping2.default.many.contents);
      namePath = appendNamePath(namePath, name);
      var children = contents.map(function (content, contentIndex) {
        return content.map(function (node, index) {
          // Build up a namePath for the children
          var childNamePath = appendNamePath(namePath, contentIndex);
          return visit.call(_this3, { path: contentsPath.push(index), namePath: childNamePath, node: node, index: index });
        });
      });
      var Many = formConfig.get('many');
      if (typeof Many !== 'function') {
        throw new Error('Expected the many handler to be a function.');
      }
      return Many({
        key: key,
        hashCode: hashCode,
        path: path,
        namePath: namePath,
        store: store,
        bus: bus,
        contentsPath: contentsPath,
        name: name,
        type: type,
        errors: errors,
        attributes: attributes,
        template: template,
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
    visitSection: function visitSection(_ref6) {
      var _this4 = this;

      var path = _ref6.path,
          namePath = _ref6.namePath,
          definition = _ref6.definition;

      var key = path.hashCode();
      var hashCode = definition.hashCode();
      // Sections have name attrs but it doesn't affect the namePath
      var name = definition.get(_schemaMapping2.default.section.name);
      var type = definition.get(_schemaMapping2.default.section.type);
      var attributes = (0, _compileAttributes2.default)(definition.get(_schemaMapping2.default.section.attributes));
      var children = definition.get(_schemaMapping2.default.section.children);
      path = path.push(_schemaMapping2.default.section.children);
      if (!children) return;
      var Section = formConfig.get('section');
      if (typeof Section !== 'function') {
        throw new Error('Expected the section handler to be a function.');
      }
      return Section({
        key: key,
        hashCode: hashCode,
        name: name,
        type: type,
        attributes: attributes,
        children: children.map(function (node, index) {
          return visit.call(_this4, { path: path, namePath: namePath, node: node, index: index });
        })
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
    visitGroup: function visitGroup(_ref7) {
      var _this5 = this;

      var path = _ref7.path,
          namePath = _ref7.namePath,
          definition = _ref7.definition;

      var key = path.hashCode();
      var hashCode = definition.hashCode();
      var type = definition.get(_schemaMapping2.default.group.type);
      var attributes = (0, _compileAttributes2.default)(definition.get(_schemaMapping2.default.group.attributes));
      var children = definition.get(_schemaMapping2.default.group.children);
      path = path.push(_schemaMapping2.default.group.children);
      if (!children) return;
      var Group = formConfig.get('group');
      if (typeof Group !== 'function') {
        throw new Error('Expected the group handler to be a function.');
      }
      return Group({
        key: key,
        hashCode: hashCode,
        type: type,
        attributes: attributes,
        children: children.map(function (node, index) {
          return visit.call(_this5, { path: path, namePath: namePath, node: node, index: index });
        })
      });
    }
  };

  // Map over the root nodes
  // We pass in an empty Immutable.List as `path` to kick things off
  var list = store.getState();
  return _immutable.List.isList(list) ? list.map(function (node, index) {
    return visit.call(_this6, { path: (0, _immutable.List)(), node: node, index: index });
  }) : false;
}