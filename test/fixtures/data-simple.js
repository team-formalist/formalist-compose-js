/*

Generated from this form and input values

{
  text_field: "Text field value",
  number_field: "Number field value",
  check_box: "Check box value",
  select_box: "3",
  radio_buttons: "2",
  text_area: "Text area value",
  date_field: "2016-03-10",
  date_time_field: "2016-03-10 17:00:00 +1100",
  section_text_field: "Section text field value",
  section_number_field: 123,
  group_text_field: "Group text field value",
  group_number_field: 123,
  attr: {
    attr_text_field: "Attr text field",
    attr_date_field: "2016-03-10"
  },
  many: [
    {
      many_text_field: "Many text field 1",
      many_date_field: "2016-03-10"
    },
    {
      many_text_field: "Many text field 2",
      many_date_field: "2016-03-09"
    }
  ],
  compound_field_text_field: "Compound text field value",
  compound_field_date_field: "2016-03-10"
}

text_field :text_field,
  label: "Text field",
  placeholder: "Text field placeholder",
  hint: "Text field hint"

number_field :number_field,
  label: "Number field",
  placeholder: "Number field placeholder",
  step: 0.5,
  min: 10,
  max: 20

check_box :check_box,
  label: "Checkbox",
  question_text: "Checkbox question?"

select_box :select_box,
  label: "Select box",
  options: [["1", "One"], ["2", "Two"], ["3", "Three"]]

radio_buttons :radio_buttons,
  label: "Radio buttons",
  options: [["1", "One"], ["2", "Two"], ["3", "Three"]]

text_area :text_area,
  label: "Text area",
  placeholder: "Text area placeholder"

date_field :date_field,
  label: "Date field"

date_time_field :date_time_field,
  label: "Date-time field"

section :section, label: "Section label" do
  text_field :section_text_field,
    label: "Section text field"
  number_field :section_number_field,
    label: "Section number field"
end

group :group, label: "Group label" do
  text_field :group_text_field,
    label: "Group text field"
  number_field :group_number_field,
    label: "Group number field"
end

many :many do
  text_field :many_text_field,
    label: "Many text field"
  date_field :many_date_field,
    label: "Many date field"
end

attr :attr do
  text_field :attr_text_field,
    label: "Attr text field"
  date_field :attr_date_field,
    label: "Attr date field"
end

compound_field do
  text_field :compound_field_text_field,
    label: "Compound text field"
  date_field :compound_field_date_field,
    label: "Compound date field"
end

 */

/*eslint-disable */
export default [
  [
    "field",
    [
      "text_field",
      "text_field",
      "Text field value",
      [],
      [
        "object",
        [
          [
            "label",
            [
              "value",
              [
                "Text field"
              ]
            ]
          ],
          [
            "hint",
            [
              "value",
              [
                "Text field hint"
              ]
            ]
          ],
          [
            "placeholder",
            [
              "value",
              [
                "Text field placeholder"
              ]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    "field",
    [
      "number_field",
      "number_field",
      "Number field value",
      [],
      [
        "object",
        [
          [
            "label",
            [
              "value",
              [
                "Number field"
              ]
            ]
          ],
          [
            "placeholder",
            [
              "value",
              [
                "Number field placeholder"
              ]
            ]
          ],
          [
            "step",
            [
              "value",
              [
                0.5
              ]
            ]
          ],
          [
            "min",
            [
              "value",
              [
                10
              ]
            ]
          ],
          [
            "max",
            [
              "value",
              [
                20
              ]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    "field",
    [
      "check_box",
      "check_box",
      "Check box value",
      [],
      [
        "object",
        [
          [
            "label",
            [
              "value",
              [
                "Checkbox"
              ]
            ]
          ],
          [
            "question_text",
            [
              "value",
              [
                "Checkbox question?"
              ]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    "field",
    [
      "select_box",
      "select_box",
      "3",
      [],
      [
        "object",
        [
          [
            "label",
            [
              "value",
              [
                "Select box"
              ]
            ]
          ],
          [
            "options",
            [
              "array",
              [
                [
                  [
                    "array",
                    [
                      [
                        [
                          "value",
                          [
                            "1"
                          ]
                        ],
                        [
                          "value",
                          [
                            "One"
                          ]
                        ]
                      ]
                    ]
                  ],
                  [
                    "array",
                    [
                      [
                        [
                          "value",
                          [
                            "2"
                          ]
                        ],
                        [
                          "value",
                          [
                            "Two"
                          ]
                        ]
                      ]
                    ]
                  ],
                  [
                    "array",
                    [
                      [
                        [
                          "value",
                          [
                            "3"
                          ]
                        ],
                        [
                          "value",
                          [
                            "Three"
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    "field",
    [
      "radio_buttons",
      "radio_buttons",
      "2",
      [],
      [
        "object",
        [
          [
            "label",
            [
              "value",
              [
                "Radio buttons"
              ]
            ]
          ],
          [
            "options",
            [
              "array",
              [
                [
                  [
                    "array",
                    [
                      [
                        [
                          "value",
                          [
                            "1"
                          ]
                        ],
                        [
                          "value",
                          [
                            "One"
                          ]
                        ]
                      ]
                    ]
                  ],
                  [
                    "array",
                    [
                      [
                        [
                          "value",
                          [
                            "2"
                          ]
                        ],
                        [
                          "value",
                          [
                            "Two"
                          ]
                        ]
                      ]
                    ]
                  ],
                  [
                    "array",
                    [
                      [
                        [
                          "value",
                          [
                            "3"
                          ]
                        ],
                        [
                          "value",
                          [
                            "Three"
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    "field",
    [
      "text_area",
      "text_area",
      "Text area value",
      [],
      [
        "object",
        [
          [
            "label",
            [
              "value",
              [
                "Text area"
              ]
            ]
          ],
          [
            "placeholder",
            [
              "value",
              [
                "Text area placeholder"
              ]
            ]
          ],
          [
            "text_size",
            [
              "value",
              [
                "normal"
              ]
            ]
          ],
          [
            "box_size",
            [
              "value",
              [
                "normal"
              ]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    "field",
    [
      "date_field",
      "date_field",
      "2016-03-10",
      [],
      [
        "object",
        [
          [
            "label",
            [
              "value",
              [
                "Date field"
              ]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    "field",
    [
      "date_time_field",
      "date_time_field",
      "2016-03-10 17:00:00 +1100",
      [],
      [
        "object",
        [
          [
            "label",
            [
              "value",
              [
                "Date-time field"
              ]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    "section",
    [
      "section",
      "section",
      [
        "object",
        [
          [
            "label",
            [
              "value",
              [
                "Section label"
              ]
            ]
          ]
        ]
      ],
      [
        [
          "field",
          [
            "section_text_field",
            "text_field",
            "Section text field value",
            [],
            [
              "object",
              [
                [
                  "label",
                  [
                    "value",
                    [
                      "Section text field"
                    ]
                  ]
                ]
              ]
            ]
          ]
        ],
        [
          "field",
          [
            "section_number_field",
            "number_field",
            123,
            [],
            [
              "object",
              [
                [
                  "label",
                  [
                    "value",
                    [
                      "Section number field"
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    "group",
    [
      "group",
      [
        "object",
        [
          [
            "label",
            [
              "value",
              [
                "Group label"
              ]
            ]
          ]
        ]
      ],
      [
        [
          "field",
          [
            "group_text_field",
            "text_field",
            "Group text field value",
            [],
            [
              "object",
              [
                [
                  "label",
                  [
                    "value",
                    [
                      "Group text field"
                    ]
                  ]
                ]
              ]
            ]
          ]
        ],
        [
          "field",
          [
            "group_number_field",
            "number_field",
            123,
            [],
            [
              "object",
              [
                [
                  "label",
                  [
                    "value",
                    [
                      "Group number field"
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    "many",
    [
      "many",
      "many",
      [],
      [
        "object",
        [
          [
            "allow_create",
            [
              "value",
              [
                true
              ]
            ]
          ],
          [
            "allow_update",
            [
              "value",
              [
                true
              ]
            ]
          ],
          [
            "allow_destroy",
            [
              "value",
              [
                true
              ]
            ]
          ],
          [
            "allow_reorder",
            [
              "value",
              [
                true
              ]
            ]
          ]
        ]
      ],
      [
        [
          "field",
          [
            "many_text_field",
            "text_field",
            null,
            [],
            [
              "object",
              [
                [
                  "label",
                  [
                    "value",
                    [
                      "Many text field"
                    ]
                  ]
                ]
              ]
            ]
          ]
        ],
        [
          "field",
          [
            "many_date_field",
            "date_field",
            null,
            [],
            [
              "object",
              [
                [
                  "label",
                  [
                    "value",
                    [
                      "Many date field"
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ],
      [
        [
          [
            "field",
            [
              "many_text_field",
              "text_field",
              "Many text field 1",
              [],
              [
                "object",
                [
                  [
                    "label",
                    [
                      "value",
                      [
                        "Many text field"
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ],
          [
            "field",
            [
              "many_date_field",
              "date_field",
              "2016-03-10",
              [],
              [
                "object",
                [
                  [
                    "label",
                    [
                      "value",
                      [
                        "Many date field"
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ],
        [
          [
            "field",
            [
              "many_text_field",
              "text_field",
              "Many text field 2",
              [],
              [
                "object",
                [
                  [
                    "label",
                    [
                      "value",
                      [
                        "Many text field"
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ],
          [
            "field",
            [
              "many_date_field",
              "date_field",
              "2016-03-09",
              [],
              [
                "object",
                [
                  [
                    "label",
                    [
                      "value",
                      [
                        "Many date field"
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    "attr",
    [
      "attr",
      "attr",
      [],
      [
        "object",
        []
      ],
      [
        [
          "field",
          [
            "attr_text_field",
            "text_field",
            "Attr text field",
            [],
            [
              "object",
              [
                [
                  "label",
                  [
                    "value",
                    [
                      "Attr text field"
                    ]
                  ]
                ]
              ]
            ]
          ]
        ],
        [
          "field",
          [
            "attr_date_field",
            "date_field",
            "2016-03-10",
            [],
            [
              "object",
              [
                [
                  "label",
                  [
                    "value",
                    [
                      "Attr date field"
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    "compound_field",
    [
      "compound_field",
      [
        "object",
        []
      ],
      [
        [
          "field",
          [
            "compound_field_text_field",
            "text_field",
            "Compound text field value",
            [],
            [
              "object",
              [
                [
                  "label",
                  [
                    "value",
                    [
                      "Compound text field"
                    ]
                  ]
                ]
              ]
            ]
          ]
        ],
        [
          "field",
          [
            "compound_field_date_field",
            "date_field",
            "2016-03-10",
            [],
            [
              "object",
              [
                [
                  "label",
                  [
                    "value",
                    [
                      "Compound date field"
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ]
]
/*eslint-enable */
