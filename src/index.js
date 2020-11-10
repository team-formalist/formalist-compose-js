export { default } from './composer'
export { default as createFormConfig } from './create-form-config'
import * as fieldActions from './actions/fields'
import * as manyActions from './actions/many'
import * as manyChildFormActions from './actions/many-child-forms'
import * as fieldActionTypes from './constants/action-types'
import { externalEvents, internalEvents } from './constants/event-types'

export let actions = Object.assign({}, fieldActions, manyActions, manyChildFormActions)
export let actionTypes = fieldActionTypes
export let events = {
  external: externalEvents,
  internal: internalEvents,
}
