'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = composer;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _redux = require('redux');

var _reduxBatchedActions = require('redux-batched-actions');

var _compiler = require('./compiler');

var _compiler2 = _interopRequireDefault(_compiler);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _eventTypes = require('./constants/event-types');

var _buses = require('./buses');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FORM_CHANGE = _eventTypes.externalEvents.FORM_CHANGE;

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

function composer() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return function (initialState) {
    var immutableState = _immutable2.default.fromJS(initialState);
    var store = (0, _redux.createStore)((0, _reduxBatchedActions.enableBatching)(_reducer2.default), immutableState);
    store.batchDispatch = function (actions) {
      store.dispatch((0, _reduxBatchedActions.batchActions)(actions));
    };

    // Expose the store subscriptions through the external bus
    store.subscribe(function () {
      return _buses.externalBus.emit(FORM_CHANGE, store.getState);
    });

    return {
      render: function render() {
        return (0, _compiler2.default)(store, _buses.internalBus, config);
      },
      // Expose the store’s getState method
      getState: store.getState,
      // Expose only the on/off methods from the external bus
      on: _buses.externalBus.on.bind(_buses.externalBus),
      off: _buses.externalBus.off.bind(_buses.externalBus)
    };
  };
}