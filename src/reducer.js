import Immutable from 'immutable'
import schemaMapping from './schema-mapping'
import { DELETE_FIELD, EDIT_FIELD, VALIDATE_FIELD } from './constants/action-types'

/**
 * TODO: Very much a WIP
 * A reducer for use alongside the Redux store for a Formalist AST.
 *
 * Handles the common actions
 *
 * @param  {ImmutableList} state The state of the form as returned by Redux.
 * The state is expected to be a `List` in Immutable.js
 *
 * @param  {Object} action A redux-compatible action.
 *
 * @return {ImmutableList} The modified state.
 */
export default function reducer (state, action) {
  switch (action.type) {
    case DELETE_FIELD:
      return state.deleteIn(action.path)
    case EDIT_FIELD:
      let valuePath = action.path.concat([schemaMapping.field.value])
      return state.updateIn(valuePath, action.value)
    case VALIDATE_FIELD:
      const { errors } = action
      let errorsPath = action.path.concat([schemaMapping.field.errors])
      return state.updateIn(errorsPath, (val) => {
        return Immutable.fromJS(errors)
      })
    default:
      return state
  }
}
