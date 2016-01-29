'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addField = addField;
exports.deleteField = deleteField;
exports.editField = editField;
exports.validateField = validateField;

var _actionTypes = require('../constants/action-types');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function addField(options) {
  return { type: types.ADD_FIELD };
}

function deleteField(path) {
  return { type: types.EDIT_FIELD, path: path };
}

function editField(path, value) {
  return { type: types.EDIT_FIELD, path: path, value: value };
}

function validateField(path) {
  return { type: types.VALIDATE_FIELD, path: path };
}