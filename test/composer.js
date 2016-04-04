import test from 'tape'
import schemaMapping from '../src/schema-mapping'
import composeForm from '../src'
import { List } from 'immutable'
import dataSimple from './fixtures/data-simple'
import textForm from './fixtures/text-form'
import * as fieldActions from '../src/actions/fields'

const isFunction = function (obj) {
  return typeof obj === 'function'
}

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

    let original = dataSimple[0][1][2]
    let parsed = list.getIn([0, 1, 2])
    assert.equals(parsed, original)

    assert.end()
  })
})

test('it should render a form', (nest) => {
  let formTemplate = composeForm(textForm)
  let form = formTemplate(dataSimple)
  nest.test('... matching the structure in the data', (assert) => {
    let renderedForm = form.render()
    /*eslint-disable */
    let expected = [
      'field:text_field-Text field value-0,1',
      'field:number_field-Number field value-1,1',
      'field:check_box-Check box value-2,1',
      'field:select_box-3-3,1',
      'field:radio_buttons-2-4,1',
      'field:text_area-Text area value-5,1',
      'field:date_field-2016-03-10-6,1',
      'field:date_time_field-2016-03-10 17:00:00 +1100-7,1',
      'start-section:section',
        'field:section_text_field-Section text field value-8,1,3,0,1',
        'field:section_number_field-123-8,1,3,1,1',
      'end-section:section',
      'start-group:group',
        'field:group_text_field-Group text field value-9,1,2,0,1',
        'field:group_number_field-123-9,1,2,1,1',
      'end-group:group',
      'start-many:many',
        'field:many_text_field-Many text field 1-10,1,5,0,0,1',
        'field:many_date_field-2016-03-10-10,1,5,0,1,1',
        'field:many_text_field-Many text field 2-10,1,5,1,0,1',
        'field:many_date_field-2016-03-09-10,1,5,1,1,1',
      'end-many:many',
      'start-attr:attr',
        'field:attr_text_field-Attr text field value-11,1,4,0,1',
        'field:attr_date_field-2016-03-10-11,1,4,1,1',
      'end-attr:attr',
      'start-compound',
        'field:compound_field_text_field-Compound text field value-12,1,2,0,1',
        'field:compound_field_date_field-2016-03-10-12,1,2,1,1',
      'end-compound'
    ].join(',')
    /*eslint-enable */
    assert.equals(renderedForm.join(','), expected)
    assert.end()
  })
})

test('it should update data', (nest) => {
  let formTemplate = composeForm(textForm)
  let form = formTemplate(dataSimple)

  nest.test('... through the redux dispatcher', (assert) => {
    let fieldPath = [0, 1]
    let expectedValue = 'Updated value'
    form.store.dispatch(
      fieldActions.editField(
        fieldPath,
        function (val) { return expectedValue }
      )
    )
    let list = form.store.getState()
    let updatedValue = list.getIn(
      fieldPath.concat([schemaMapping.field.value])
    )
    assert.equals(updatedValue, expectedValue)
    assert.end()
  })
})
