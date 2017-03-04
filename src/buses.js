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

const {
  FORM_VALID,
  FORM_INVALID,
  FORM_BUSY,
  FORM_IDLE,
} = externalEvents

const {
  FIELD_VALID,
  FIELD_INVALID,
  FIELD_BUSY,
  FIELD_IDLE,
} = internalEvents

// Create two event buses one for internal use by the form renderer,
// and one for external use by the consuming application.
export const internalBus = new Emitter()
export const externalBus = new Emitter()

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
    externalBus.emit(FORM_VALID)
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
  invalidQueue = invalidQueue.concat([id])
  // If there’s a single item in the queue, send the external FORM_INVALID event
  if (invalidQueue.length === 1) {
    externalBus.emit(FORM_INVALID)
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
    externalBus.emit(FORM_IDLE)
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
  busyQueue = busyQueue.concat([id])
  // If there’s a single item in the queue, send the external FORM_BUSY event
  if (busyQueue.length === 1) {
    externalBus.emit(FORM_BUSY)
  }
}

// Bind the listeners to the internal bus
internalBus.on(FIELD_VALID, onComponentValid)
internalBus.on(FIELD_INVALID, onComponentInvalid)
internalBus.on(FIELD_IDLE, onComponentIdle)
internalBus.on(FIELD_BUSY, onComponentBusy)