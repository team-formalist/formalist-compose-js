import test from 'tape'
import schemaMapping from '../src/schema-mapping'
import composeForm from '../src'
// import { List } from 'immutable'
import data from './fixtures/data-many'
import textForm from './fixtures/text-form'
import * as manyActions from '../src/actions/many'

test('it should handle `many` options', (nest) => {
  const formTemplate = composeForm(textForm)
  const form = formTemplate(data)
  const basePath = [0, 1]

  nest.test('... adding a new template to the contents', (assert) => {
    // Get the initial content
    const initialContents = form.getState().getIn(
      basePath.concat(schemaMapping.many.contents)
    )

    // Dispatch call to add new content from template
    form.__test__.store.dispatch(
      manyActions.addManyContent(basePath)
    )
    // Get the updated content
    const modifiedContents = form.getState().getIn(
      basePath.concat(schemaMapping.many.contents)
    )

    assert.ok(initialContents.count(), 2)
    assert.ok(modifiedContents.count(), 3)
    assert.end()
  })

  nest.test('... deleting an existing content item', (assert) => {
    // Get the initial content
    const initialContents = form.getState().getIn(
      basePath.concat(schemaMapping.many.contents)
    )

    // Dispatch call to add new content from template
    // We’re removing the first item here
    form.__test__.store.dispatch(
      manyActions.deleteManyContent(
        basePath.concat([schemaMapping.many.contents, 0])
      )
    )

    // Get the updated content
    const modifiedContents = form.getState().getIn(
      basePath.concat(schemaMapping.many.contents)
    )

    assert.ok(initialContents.count(), 2)
    assert.ok(modifiedContents.count(), 1)
    assert.end()
  })

  nest.test('... editing the contents', (assert) => {
    // Get the initial content
    const initialContents = form.getState().getIn(
      basePath.concat(schemaMapping.many.contents)
    )

    // Dispatch call to edit contents. We simply reverse the order
    // so we can check that they swap
    form.__test__.store.dispatch(
      manyActions.editManyContents(
        basePath,
        function (val) { return initialContents.reverse() }
      )
    )

    // Get the updated content
    const modifiedContents = form.getState().getIn(
      basePath.concat(schemaMapping.many.contents)
    )

    assert.equals(initialContents.first(), modifiedContents.last())
    assert.end()
  })

  nest.test('... allow validation messages to assigned', (assert) => {
    // Get the initial content
    const initialErrors = form.getState().getIn(
      basePath.concat(schemaMapping.many.errors)
    )

    // Dispatch call to edit contents. We simply reverse the order
    // so we can check that they swap
    form.__test__.store.dispatch(
      manyActions.validateMany(
        basePath,
        (contents) => ([
          'Too many things',
          'Not enough things',
        ])
      )
    )

    // Get the updated content
    const modifiedErrors = form.getState().getIn(
      basePath.concat(schemaMapping.many.errors)
    )

    assert.equals(initialErrors.count(), 0)
    assert.equals(modifiedErrors.count(), 2)
    assert.end()
  })
})
