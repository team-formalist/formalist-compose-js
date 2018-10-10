'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createBuses;

var _componentEmitter = require('component-emitter');

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _eventTypes = require('./constants/event-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates two event buses for communication within and external to
 * the formalist instance being rendered.
 *
 * The `internalBus` handles all internal communication between
 * components, and the `externalBus` propagates those events externally
 * when appropriate.
 *
 * We use this in two ways thus far:
 *
 * - To communicate that the form is busy, and when it returns to being
 *   idle.
 * - To communicate that the form is invalid, and when it returns to
 *   being valid.
 *
 * We do this through two queues that listen to internal events and then,
 * based on the state of those queues, emits events through the external
 * bus.
 */

function createBuses() {
  // Create two event buses one for internal use by the form renderer,
  // and one for external use by the consuming application.
  var internalBus = new _componentEmitter2.default();
  var externalBus = new _componentEmitter2.default();

  // Create queues for busy/invalid events
  var busyQueue = [];
  var invalidQueue = [];

  /**
   * Handler for internal `*_VALID` events.
   *
   * Removes a field reference to the invalid queue and fires the external
   * `valid` event if appropriate.
   *
   * @param {String} id Unique identifier for this event pairing
   */
  function onComponentValid(id) {
    var index = invalidQueue.indexOf(id);
    if (index > -1) {
      invalidQueue.splice(index, 1);
    }
    // If the queue is empty, send the external FORM_VALID event
    if (invalidQueue.length === 0) {
      externalBus.emit(_eventTypes.externalEvents.FORM_VALID);
    }
  }

  /**
   * Handler for internal `*_INVALID` events.
   *
   * Adds the field reference to the invalid queue and fires the external
   * `invalid` event if appropriate.
   *
   * @param {String} id Unique identifier for this event pairing
   */
  function onComponentInvalid(id) {
    var index = invalidQueue.indexOf(id);
    // Ensure we only keep one reference for each id
    if (index === -1) {
      invalidQueue = invalidQueue.concat([id]);
    }
    // If there’s a single item in the queue, send the external FORM_INVALID event
    if (invalidQueue.length === 1) {
      externalBus.emit(_eventTypes.externalEvents.FORM_INVALID);
    }
  }

  /**
   * Handler for internal `*_IDLE` events.
   *
   * Removes a field reference to the busy queue and fires the external
   * `idle` event if appropriate.
   *
   * @param {String} id Unique identifier for this event pairing
   */
  function onComponentIdle(id) {
    var index = busyQueue.indexOf(id);
    if (index > -1) {
      busyQueue.splice(index, 1);
    }
    // If the queue is empty, send the external FORM_IDLE event
    if (busyQueue.length === 0) {
      externalBus.emit(_eventTypes.externalEvents.FORM_IDLE);
    }
  }

  /**
   * Handler for internal `*_BUSY` events.
   *
   * Adds the field reference to the busy queue and fires the external
   * `busy` event if appropriate.
   *
   * @param {String} id Unique identifier for this event pairing
   */
  function onComponentBusy(id) {
    var index = busyQueue.indexOf(id);
    // Ensure we only keep one reference for each id
    if (index === -1) {
      busyQueue = busyQueue.concat([id]);
    }
    // If there’s a single item in the queue, send the external FORM_BUSY event
    if (busyQueue.length === 1) {
      externalBus.emit(_eventTypes.externalEvents.FORM_BUSY);
    }
  }

  /**
   * onInternalFieldChange
   *
   * Bubble up internal field change events to the external event bus
   */
  function onInternalFieldChange(args) {
    externalBus.emit(_eventTypes.externalEvents.FIELD_CHANGE, args);
  }

  /**
   * onInternalFieldRemoved
   *
   * Bubble up internal field removed events to the external event bus
   */
  function onInternalFieldRemoved(args) {
    externalBus.emit(_eventTypes.externalEvents.FIELD_REMOVED, args);
  }

  /**
   * onInternalFormInitialised
   *
   * Bubble up internal form initialised events to the external event bus
   */
  function onInternalFormInitialised(args) {
    externalBus.emit(_eventTypes.externalEvents.FORM_INITIALISED, args);
  }

  /**
   * onInternalFormRemoved
   *
   * Bubble up internal form removed events to the external event bus
   */
  function onInternalFormRemoved(args) {
    externalBus.emit(_eventTypes.externalEvents.FORM_REMOVED, args);
  }

  // Bind the listeners to the internal bus
  internalBus.on(_eventTypes.internalEvents.FIELD_VALID, onComponentValid);
  internalBus.on(_eventTypes.internalEvents.FIELD_INVALID, onComponentInvalid);
  internalBus.on(_eventTypes.internalEvents.FIELD_IDLE, onComponentIdle);
  internalBus.on(_eventTypes.internalEvents.FIELD_BUSY, onComponentBusy);
  internalBus.on(_eventTypes.internalEvents.FIELD_CHANGE, onInternalFieldChange);
  internalBus.on(_eventTypes.internalEvents.FIELD_REMOVED, onInternalFieldRemoved);
  internalBus.on(_eventTypes.internalEvents.FORM_INITIALISED, onInternalFormInitialised);
  internalBus.on(_eventTypes.internalEvents.FORM_REMOVED, onInternalFormRemoved);

  return {
    internalBus: internalBus,
    externalBus: externalBus
  };
}