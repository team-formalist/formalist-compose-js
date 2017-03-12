import Immutable from 'immutable'
import { createStore } from 'redux'
import { batchActions, enableBatching } from 'redux-batched-actions'
import compiler from './compiler'
import reducer from './reducer'
import { externalEvents } from './constants/event-types'
import { internalBus, externalBus } from './buses'

const { FORM_CHANGE } = externalEvents

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
export default function composer (config = {}) {
  return (initialState) => {
    let immutableState = Immutable.fromJS(initialState)
    let store = createStore(enableBatching(reducer), immutableState)
    store.batchDispatch = (actions) => {
      store.dispatch(batchActions(actions))
    }

    // Expose the store subscriptions through the external bus
    store.subscribe(() => externalBus.emit(FORM_CHANGE, store.getState))

    const api = {
      render: () => {
        return compiler(store, internalBus, config)
      },
      // Expose the store’s getState method
      getState: store.getState,
      // Expose only the on/off methods from the external bus
      on: externalBus.on.bind(externalBus),
      off: externalBus.off.bind(externalBus),
    }

    // Expose store to test environment only
    if (TEST) {
      api.__test__ = {
        store,
      }
    }

    return api
  }
}
