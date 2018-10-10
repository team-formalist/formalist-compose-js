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

var _schemaMapping = require('./schema-mapping');

var _schemaMapping2 = _interopRequireDefault(_schemaMapping);

var _eventTypes = require('./constants/event-types');

var _buses = require('./buses');

var _buses2 = _interopRequireDefault(_buses);

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
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (initialState) {
    var immutableState = _immutable2.default.fromJS(initialState);
    var store = (0, _redux.createStore)((0, _reduxBatchedActions.enableBatching)(_reducer2.default), immutableState);
    store.batchDispatch = function (actions) {
      store.dispatch((0, _reduxBatchedActions.batchActions)(actions));
    };

    // Create per-instance buses

    var _createBuses = (0, _buses2.default)(),
        internalBus = _createBuses.internalBus,
        externalBus = _createBuses.externalBus;

    // Expose the store subscriptions through the external bus


    store.subscribe(function () {
      return externalBus.emit(FORM_CHANGE, store.getState);
    });

    // Mapping
    var pathMapping = {};

    var api = {
      render: function render() {
        return (0, _compiler2.default)({ store: store, bus: internalBus, config: config, pathMapping: pathMapping });
      },
      // Expose the store’s getState method
      getState: store.getState,
      // Get value of a field by named path
      getValue: function getValue(namePath) {
        var fieldMapping = pathMapping[namePath];
        if (fieldMapping != null) {
          var path = fieldMapping.path;

          var valuePath = path.concat([_schemaMapping2.default.field.value]);
          return store.getState().getIn(valuePath);
        } else {
          throw new Error('No component matching namePath: ' + namePath);
        }
      },
      // Set value of a field by named path
      setValue: function setValue(namePath, value) {
        var fieldMapping = pathMapping[namePath];
        if (fieldMapping != null) {
          var edit = fieldMapping.edit;

          return edit(value);
        } else {
          throw new Error('No component matching namePath: ' + namePath);
        }
      },
      // Expose only the on/off methods from the external bus
      on: externalBus.on.bind(externalBus),
      off: externalBus.off.bind(externalBus),
      emit: externalBus.emit.bind(externalBus)

      // Expose store through private convention environment only
    };api.__test__ = {
      store: store
    };

    return api;
  };
}