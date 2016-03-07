import test from 'tape'
import isFunction from '@f/is-function'
import { List } from 'immutable'
import composeForm from '../src'
import * as fieldActions from '../src/actions/fields'
import schemaMapping from '../src/schema-mapping'
import dataSimple from './fixtures/data-simple'
import textForm from './fixtures/text-form'

test('it should compose a form template', (nest) => {
  let formTemplate = composeForm({})

  nest.test('... returning a callable function', (assert) => {
    assert.ok(isFunction(formTemplate), 'compose form is a function')
    assert.end()
  })
})

test('it should create a form instance from a composed template', (nest) => {
  let formTemplate = composeForm({})
  let form = formTemplate()

  nest.test('... with a render method', (assert) => {
    assert.ok(form.hasOwnProperty('render'), 'form has a render property')
    assert.ok(isFunction(form.render), 'render is a function')
    assert.end()
  })

  nest.test('... with a store property', (assert) => {
    assert.ok(form.hasOwnProperty('store'), 'form has a store property')
    assert.end()
  })
})

test('it should consume an abstract syntax tree', (nest) => {
  let formTemplate = composeForm(textForm)
  let form = formTemplate(dataSimple)

  nest.test('... and return it as a redux store', (assert) => {
    assert.ok(form.store.hasOwnProperty('dispatch'), 'store has a dispatch property')
    assert.ok(isFunction(form.store.dispatch), 'store has a dispatch function')
    assert.ok(form.store.hasOwnProperty('getState'), 'store has a getState property')
    assert.ok(isFunction(form.store.getState), 'store has a getState function')
    assert.ok(form.store.hasOwnProperty('subscribe'), 'store has a subscribe property')
    assert.ok(isFunction(form.store.subscribe), 'store has a subscribe function')
    assert.end()
  })

  nest.test('... and convert it to an immutable list', (assert) => {
    let list = form.store.getState()
    assert.ok(List.isList(list), 'list is Immutable.List')
    assert.end()
  })

  nest.test('... with values matching the paths in the original data', (assert) => {
    let list = form.store.getState()

    let actual = dataSimple[0][1][2]
    let expected = list.getIn([0, 1, 2])
    assert.equals(expected, actual)

    actual = dataSimple[1][1][2]
    expected = list.getIn([1, 1, 2])
    assert.equals(expected, actual)

    assert.end()
  })
})

test('it should render a form', (nest) => {
  let formTemplate = composeForm(textForm)
  let form = formTemplate(dataSimple)

  nest.test('... matching the structure in the data', (assert) => {
    let renderedForm = form.render()
    let expected = 'field:field-one-name-123-0,1,field:field-two-name-Title goes here-1,1,start-section:Main section,field:field-three-name-321-2,1,2,0,1,field:field-four-name-Content goes here-2,1,2,1,1,end-section:Main section'
    assert.equals(renderedForm.join(), expected)
    assert.end()
  })
})

test('it should update data', (nest) => {
  let formTemplate = composeForm(textForm)
  let form = formTemplate(dataSimple)

  nest.test('... through the redux dispatcher', (assert) => {
    let fieldPath = [0, 1]
    let expected = 'Updated value'
    form.store.dispatch(
      fieldActions.editField(
        fieldPath,
        function (val) { return expected }
      )
    )
    let list = form.store.getState()
    let actual = list.getIn(
      fieldPath.concat([schemaMapping.field.value])
    )
    assert.equals(expected, actual)
    assert.end()
  })
})
