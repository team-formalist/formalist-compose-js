import * as types from '../constants/action-types'

export function addManyContent (path) {
  return { type: types.ADD_MANY_CONTENT, path }
}

export function deleteManyContent (path) {
  return { type: types.DELETE_MANY_CONTENT, path }
}

export function editManyContents (path, contents) {
  return { type: types.EDIT_MANY_CONTENTS, path, contents }
}

export function reorderManyContents (path, order) {
  return { type: types.REORDER_MANY_CONTENTS, path, order }
}

export function validateMany (path, validate) {
  return { type: types.VALIDATE_MANY, path, validate }
}
