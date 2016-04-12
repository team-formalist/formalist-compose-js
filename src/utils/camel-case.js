/**
 * CamelCase
 * @param  {String} str String with "under_score"
 * @return {String} UnderScore is now CamelCased
 */
function camelCase (str, capitaliseLead = false) {
  try {
    str = str.replace(/_([a-z])/g, (group) => {
      if (group[1]) {
        return group[1].toUpperCase()
      }
    })
    if (capitaliseLead) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    } else {
      return str
    }
  } catch (err) {
    throw new Error(err + '. `str` is ' + str)
  }
}

export default camelCase
