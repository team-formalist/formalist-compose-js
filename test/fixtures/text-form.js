const Group = ({type, children}) => {
  return [`start-group:${type}`, children.join(), `end-group:${type}`]
}

const Many = ({name, children}) => {
  return [`start-many:${name}`, children.join(), `end-many:${name}`]
}

const Attr = ({name, children}) => {
  return [`start-attr:${name}`, children.join(), `end-attr:${name}`]
}

const Section = ({name, children}) => {
  return [`start-section:${name}`, children.join(), `end-section:${name}`]
}

const Field = ({name, value, config, path, store}) => {
  return [`field:${name}-${value}-${path.join()}`]
}

export default {
  attr: Attr,
  group: Group,
  many: Many,
  section: Section,
  fields: {
    text_field: Field,
    number_field: Field,
    select_box: Field,
    check_box: Field,
    radio_buttons: Field,
    text_area: Field
  }
}
