'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addManyContent = addManyContent;
exports.deleteManyContent = deleteManyContent;
exports.editManyContents = editManyContents;
exports.validateMany = validateMany;

var _actionTypes = require('../constants/action-types');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function addManyContent(path) {
  return { type: types.ADD_MANY_CONTENT, path: path };
}

function deleteManyContent(path) {
  return { type: types.DELETE_MANY_CONTENT, path: path };
}

function editManyContents(path, contents) {
  return { type: types.EDIT_MANY_CONTENTS, path: path, contents: contents };
}

function validateMany(path, errors) {
  return { type: types.VALIDATE_MANY, path: path, errors: errors };
}