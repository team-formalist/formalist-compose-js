import composer from './composer'
import * as fieldActions from './actions/fields'
import * as manyActions from './actions/many'
import * as fieldActionTypes from './constants/action-types'

export default composer
export let actions = Object.assign({}, fieldActions, manyActions)
export let actionTypes = fieldActionTypes
