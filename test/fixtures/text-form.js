const Group = ({name, children}) => {
  return [`start-group:$name}`, children.join(), `end-group:$name}`]
}

const Many = ({name, children}) => {
  return [`start-many:$name}`, children.join(), `end-many:$name}`]
}

const Section = ({name, children}) => {
  return [`start-section:${name}`, children.join(), `end-section:${name}`]
}

const Field = ({name, value, config, path, store}) => {
  return [`field:${name}-${value}-${path.join()}`]
}

export default {
  group: Group,
  many: Many,
  section: Section,
  fields: {
    string: Field,
    int: Field
  }
}
