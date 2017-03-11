# Formalist Compose

A JavaScript implementation for composing an abstract syntax tree (matching the Formalist schema) into a renderable object.

## Usage

An example AST of a form
```js
// data.js

export default  = [
  [
    "field",
    [
      "field-one-name",
      "int",
      "default",
      123,
      [],
      [],
      []
    ]
  ],
  [
    "field",
    [
      "field-two-name",
      "string",
      "default",
      "Title goes here",
      [],
      [],
      []
    ]
  ],
  [
    "section",
    [
      "Main section",
      [],
      [
        [
          "field",
          [
            "field-three-name",
            "string",
            "default",
            321,
            [],
            [],
            []
          ]
        ],
        [
          "field",
          [
            "field-four-name",
            "string",
            "default",
            "Content goes here",
            [],
            [],
            []
          ]
        ]
      ]
    ]
  ]
]
```

Create a _composed_ form function passing in an optional config object. The _composed_ form function then consumes the `AST` and returns renderable object.

```js
import composeForm, {createFormConfig} from 'formalist-compose'
import AST from './data.js'

// create a 'composed' form function passing in option config object e.g. { prefix: 'user' }
let formTemplate = composeForm(createFormConfig({ ... form config }))

// pass the AST to the 'composed' form function
let form = formTemplate(AST)

form.render()
//=> 'field:field-one-name-123-0,1,field:field-two-name-Title goes here-1,1,start-section:Main section,field:field-three-name-321-2,1,2,0,1,field:field-four-name-Content goes here-2,1,2,1,1,end-section:Main section'
```

## API

A composed form exposes the following methods:

* `render` — compile and render the form based on its current state
* `getState` — get the current state object representing the form
* `dispatch` — dispatch an action to form’s reducer
* `batchDispatch` — dispatch multiple actions to form’s reducer
* `on` — bind listeners to form events
* `off` — unbind listeners to form events

## Events

### External

A composed form exposes an event bus, through the `on` and `off` methods, that can be used to listen to events that are relevant to a consuming application:

* `change` - fired when the form’s state is updated, passes the internal store’s `getState` method
* `busy` - fired when the form is busy (uploading a file for example)
* `idle` - fired when the form is no longer busy
* `invalid` - fired when a validation error has occurred
* `valid` - fired when validation errors have been cleared

### Internal

A compiled form passes an internal event bus to each `field` and `many` component. This bus listens to the following events:

* `field:busy` — fire when a field is busy, expects a unique ID
* `field:idle` — fire when a field is no longer busy, expects the same unique ID to match against busy queue
* `field:invalid` — fire when a field is invalid, expects a unique ID
* `field:valid` — fire when a field is no longer invalid, expects the same unique ID to match against invalid queue.

## Tests

```
$ npm run test
```
