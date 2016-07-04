# Formalist Compose

A JavaScript implementation for composing an abstract syntax tree (matching the Formalist schema) into a renderable object.

#### Example

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

## Tests

```
$ npm run test
```
