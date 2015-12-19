const Group = ({name, children}) => {
  return [`start-group:$name}`, children, `end-group:$name}`]
}

const Many = ({name, children}) => {
  return [`start-many:$name}`, children, `end-many:$name}`]
}

const Section = ({name, children}) => {
  return [`start-section:$name}`, children, `end-section:$name}`]
}

const Field = ({name, value, config, path, store}) => {
  return [`field:${name}-${value}`]
}

export default {
  group: Group,
  many: Many,
  section: Section,
  fields: {
    text: Field,
    image: Field,
    time: Field
  }
}
