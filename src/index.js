export { default } from './composer'
export { default as createFormConfig } from './create-form-config'
import * as fieldActions from './actions/fields'
import * as manyActions from './actions/many'
import * as fieldActionTypes from './constants/action-types'

export let actions = Object.assign({}, fieldActions, manyActions)
export let actionTypes = fieldActionTypes
