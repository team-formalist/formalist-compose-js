import * as types from '../constants/action-types'

export function deleteField (path) {
  return { type: types.EDIT_FIELD, path }
}

export function editField (path, value) {
  return { type: types.EDIT_FIELD, path, value }
}

export function validateField (path, errors) {
  return { type: types.VALIDATE_FIELD, path, errors }
}
