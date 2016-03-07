# Formalist Compose

A JavaScript implementation for composing an abstract syntax tree (matching the Formalist schema) into a renderable object.

#### Example

An example AST for a login form.
```js
// data.js

export default  = [
  [
    "field",
    [
      "username",
      "string",
      "default",
      null,
      [
        [
          "predicate",
          [
            "filled?",
            []
          ]
        ]
      ],
      [],
      [
        [
          "label",
          "Username"
        ],
        [
          "placeholder",
          "Enter your username"
        ]
      ]
    ]
  ],
  [
    "field",
    [
      "password",
      "string",
      "default",
      null,
      [
        [
          "predicate",
          [
            "filled?",
            []
          ]
        ]
      ],
      [],
      [
        [
          "label",
          "Password"
        ],
        [
          "placeholder",
          "Enter your password"
        ],
        [
          "password",
          true
        ],
        [
          "inline",
          true
        ]
      ]
    ]
  ]
]
```

Import and and pass the AST to `compose` which returns a renderable object - which we can then pass to [formalist-standard-react](https://github.com/icelab/formalist-standard-react 'formalist-standard-react') to generate form fields.

```js
import compose from 'formalist-compose'
import loginFormAST from './data.js'

const renderableObject = compose(AST);
console.log(renderableObject)
// => [Array[2], Array[2], Array[2], Array[2], Array[2], Array[2], Array[2]]
```

## Tests

```
$ npm run test
```
