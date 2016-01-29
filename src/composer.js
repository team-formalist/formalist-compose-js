import Immutable from 'immutable'
import { createStore } from 'redux'
import { batchActions, enableBatching } from 'redux-batched-actions'
import compiler from './compiler'
import reducer from './reducer'

/**
 * Composes forms from the passed `config`. Returning a function that can
 * compile an abstract syntax tree (AST) that matches the Formalist schema with
 * said `config`.
 *
 * The returned (composed) function will also convert the AST to an Immutable
 * List and wrap it up as a redux store with a standard reducer.
 *
 * @param  {Object} config
 *
 * @return {Object}
 */
export default function composer (config) {
  return (initialState) => {
    let immutableState = Immutable.fromJS(initialState)
    let store = createStore(enableBatching(reducer), immutableState)
    store.batchDispatch = (actions) => {
      store.dispatch(batchActions(actions))
    }
    return {
      render: () => {
        return compiler(store, config)
      },
      store: store
    }
  }
}
