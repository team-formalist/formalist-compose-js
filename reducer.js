import schemaMapping from "./schema-mapping"

/**
 * TODO: Very much a WIP
 * A reducer for use alongside the Redux store for a Formalist AST.
 *
 * Handles the common actions
 *
 * @param  {ImmutableList} state The state of the form as returned by Redux.
 * The state is expected to be a `List` in Immutable.js
 *
 * @param  {Object} action A flux-compatible action.
 *
 * @return {ImmutableList} The modified state.
 */
export default (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      var path = action.payload.path.concat(
        [schemaMapping.fields.value]
      )
      return state.updateIn(path, action.payload.value)
    // ... a whole bunch of actions go here
    default:
      return state
  }
}
