import {createConfig} from '../../src'

const Attr = ({name, children}) => {
  return [`start-attr:${name}`, children.join(), `end-attr:${name}`]
}

const CompoundField = ({children}) => {
  return ['start-compound', children.join(), 'end-compound']
}

const Field = ({name, value, config, path, store}) => {
  return [`field:${name}-${value}-${path.join()}`]
}

const Group = ({type, children}) => {
  return [`start-group:${type}`, children.join(), `end-group:${type}`]
}

const Many = ({name, children}) => {
  return [`start-many:${name}`, children.flatten().join(), `end-many:${name}`]
}

const Section = ({name, children}) => {
  return [`start-section:${name}`, children.join(), `end-section:${name}`]
}

export default createConfig({
  attr: Attr,
  group: Group,
  many: Many,
  compoundField: CompoundField,
  section: Section,
  fields: {
    default: Field,
    checkBox: Field,
    dateField: Field,
    dateTimeField: Field,
    numberField: Field,
    radioButtons: Field,
    selectBox: Field,
    textArea: Field,
    textField: Field,
  },
})
