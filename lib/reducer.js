'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _schemaMapping = require('./schema-mapping');

var _schemaMapping2 = _interopRequireDefault(_schemaMapping);

var _actionTypes = require('./constants/action-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: Very much a WIP
 * A reducer for use alongside the Redux store for a Formalist AST.
 *
 * Handles the common actions
 *
 * @param  {ImmutableList} state The state of the form as returned by Redux.
 * The state is expected to be a `List` in Immutable.js
 *
 * @param  {Object} action A redux-compatible action.
 *
 * @return {ImmutableList} The modified state.
 */
function reducer(state, action) {
  switch (action.type) {
    case _actionTypes.DELETE_FIELD:
      return state.deleteIn(action.path);
    case _actionTypes.EDIT_FIELD:
      var valuePath = action.path.concat([_schemaMapping2.default.field.value]);
      return state.updateIn(valuePath, action.value);
    default:
      return state;
  }
}