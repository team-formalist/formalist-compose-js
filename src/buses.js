import Emitter from 'component-emitter'
import { externalEvents, internalEvents } from './constants/event-types'

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

export default function createBuses () {
  // Create two event buses one for internal use by the form renderer,
  // and one for external use by the consuming application.
  const internalBus = new Emitter()
  const externalBus = new Emitter()

  // Create queues for busy/invalid events
  let busyQueue = []
  let invalidQueue = []

  /**
   * Handler for internal `*_VALID` events.
   *
   * Removes a field reference to the invalid queue and fires the external
   * `valid` event if appropriate.
   *
   * @param {String} id Unique identifier for this event pairing
   */
  function onComponentValid (id) {
    const index = invalidQueue.indexOf(id)
    if (index > -1) {
      invalidQueue.splice(index, 1)
    }
    // If the queue is empty, send the external FORM_VALID event
    if (invalidQueue.length === 0) {
      externalBus.emit(externalEvents.FORM_VALID)
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
  function onComponentInvalid (id) {
    const index = invalidQueue.indexOf(id)
    // Ensure we only keep one reference for each id
    if (index === -1) {
      invalidQueue = invalidQueue.concat([id])
    }
    // If there’s a single item in the queue, send the external FORM_INVALID event
    if (invalidQueue.length === 1) {
      externalBus.emit(externalEvents.FORM_INVALID)
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
  function onComponentIdle (id) {
    const index = busyQueue.indexOf(id)
    if (index > -1) {
      busyQueue.splice(index, 1)
    }
    // If the queue is empty, send the external FORM_IDLE event
    if (busyQueue.length === 0) {
      externalBus.emit(externalEvents.FORM_IDLE)
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
  function onComponentBusy (id) {
    const index = busyQueue.indexOf(id)
    // Ensure we only keep one reference for each id
    if (index === -1) {
      busyQueue = busyQueue.concat([id])
    }
    // If there’s a single item in the queue, send the external FORM_BUSY event
    if (busyQueue.length === 1) {
      externalBus.emit(externalEvents.FORM_BUSY)
    }
  }

  /**
   * onInternalFieldChange
   *
   * Bubble up internal field change events to the external event bus
   */
  function onInternalFieldChange (args) {
    externalBus.emit(externalEvents.FIELD_CHANGE, args)
  }

  /**
   * onInternalFieldRemoved
   *
   * Bubble up internal field removed events to the external event bus
   */
  function onInternalFieldRemoved (args) {
    externalBus.emit(externalEvents.FIELD_REMOVED, args)
  }

  /**
   * onInternalFormInitialized
   *
   * Bubble up internal form initialized events to the external event bus
   */
  function onInternalFormInitialized (args) {
    externalBus.emit(externalEvents.FORM_INITIALIZED, args)
  }

  /**
   * onInternalFormRemoved
   *
   * Bubble up internal form removed events to the external event bus
   */
  function onInternalFormRemoved (args) {
    externalBus.emit(externalEvents.FORM_REMOVED, args)
  }

  // Bind the listeners to the internal bus
  internalBus.on(internalEvents.FIELD_VALID, onComponentValid)
  internalBus.on(internalEvents.FIELD_INVALID, onComponentInvalid)
  internalBus.on(internalEvents.FIELD_IDLE, onComponentIdle)
  internalBus.on(internalEvents.FIELD_BUSY, onComponentBusy)
  internalBus.on(internalEvents.FIELD_CHANGE, onInternalFieldChange)
  internalBus.on(internalEvents.FIELD_REMOVED, onInternalFieldRemoved)
  internalBus.on(internalEvents.FORM_INITIALIZED, onInternalFormInitialized)
  internalBus.on(internalEvents.FORM_REMOVED, onInternalFormRemoved)

  return {
    internalBus,
    externalBus,
  }
}
