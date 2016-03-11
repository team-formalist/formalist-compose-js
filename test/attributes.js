import test from 'tape'
import Immutable, { List, Map } from 'immutable'
import compileAttributes from '../src/compile-attributes'
import dataAttributes from './fixtures/data-attributes'

test('it should compile an attributes AST', (nest) => {
  const attributes = compileAttributes(Immutable.fromJS(dataAttributes))

  nest.test('... into an Immutable.Map', (assert) => {
    assert.ok(Map.isMap(attributes), 'attributes is a map')
    assert.end()
  })

  nest.test('... containing the correct data', (assert) => {
    assert.plan(2)
    assert.equals(attributes.get('label'), 'String (radio)', 'label is correct')
    assert.deepEqual(
      attributes.get('options').toJS(),
      [
        ['1', 'One'],
        ['2', 'Two'],
        ['3', 'Three']
      ],
      'options are a correctly constructed array-like'
    )
    assert.end()
  })

  nest.test('... where arrays are Immutable Lists', (assert) => {
    assert.ok(
      List.isList(attributes.get('options')),
      'options is an immutable list'
    )
    assert.end()
  })
})
