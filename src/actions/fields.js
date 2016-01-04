import * as types from '../constants/action-types'

export function addField (options) {
  return { type: types.ADD_FIELD }
}

export function deleteField (path) {
  return { type: types.EDIT_FIELD, path }
}

export function editField (path, value) {
  return { type: types.EDIT_FIELD, path, value }
}
