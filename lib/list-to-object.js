'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = listToObject;

var _immutable = require('immutable');

/**
 * Turn a ImmutableList of [key,value] pairs into a object {key: value}
 *
 * @param  {ImmutableList} list The list of key-value pairs
 *
 * @return {Object}
 */

function listToObject(list) {
  if (!list || !_immutable.List.isList(list)) return false;
  var result = {};
  list.forEach(function (key) {
    result[key.get(0)] = key.get(1);
  });
  return result;
}