import * as types from '../constants/action-types'

export function remove (path) {
  return { type: types.REMOVE_FIELD, path }
}

export function edit (path, value) {
  return { type: types.EDIT_FIELD, path, value }
}

export function validate (path, errors) {
  return { type: types.VALIDATE_FIELD, path, errors }
}
