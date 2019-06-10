module.exports.stripTags = string => string.replace(/(<([^>]+)>)/, '')

module.exports.isDate = string => {
  if (string.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return true
  } else {
    return false
  }
}
