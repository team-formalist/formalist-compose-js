'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = remove;
exports.edit = edit;
exports.validate = validate;

var _actionTypes = require('../constants/action-types');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function remove(path) {
  return { type: types.REMOVE_FIELD, path: path };
}

function edit(path, value) {
  return { type: types.EDIT_FIELD, path: path, value: value };
}

function validate(path, errors) {
  return { type: types.VALIDATE_FIELD, path: path, errors: errors };
}