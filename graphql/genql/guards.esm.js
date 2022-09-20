
var Galaxy_possibleTypes = ['Galaxy']
export var isGalaxy = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isGalaxy"')
  return Galaxy_possibleTypes.includes(obj.__typename)
}



var Mutation_possibleTypes = ['Mutation']
export var isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var Ore_possibleTypes = ['Ore']
export var isOre = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isOre"')
  return Ore_possibleTypes.includes(obj.__typename)
}



var Planet_possibleTypes = ['Planet']
export var isPlanet = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPlanet"')
  return Planet_possibleTypes.includes(obj.__typename)
}



var Quadrant_possibleTypes = ['Quadrant']
export var isQuadrant = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuadrant"')
  return Quadrant_possibleTypes.includes(obj.__typename)
}



var Query_possibleTypes = ['Query']
export var isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var Sector_possibleTypes = ['Sector']
export var isSector = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSector"')
  return Sector_possibleTypes.includes(obj.__typename)
}



var Star_possibleTypes = ['Star']
export var isStar = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isStar"')
  return Star_possibleTypes.includes(obj.__typename)
}



var Subsector_possibleTypes = ['Subsector']
export var isSubsector = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSubsector"')
  return Subsector_possibleTypes.includes(obj.__typename)
}



var System_possibleTypes = ['System']
export var isSystem = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSystem"')
  return System_possibleTypes.includes(obj.__typename)
}
