import Immutable, { List } from "immutable"

/**
 * Turn a ImmutableList of [key,value] pairs into a object {key: value}
 *
 * @param  {ImmutableList} list The list of key-value pairs
 *
 * @return {Object}
 */

export default function listToObject(list) {
  if (!list || !List.isList(list) return
  var result = {}
  list.forEach((key) => {
    result[key.get(0)] = key.get(1)
  })
  return result
}
