const removeEl = (array, el) => {
  const idx = array.indexOf(el)
  if (idx > -1) {
    array.splice(idx, 1)
  }
  return array
}

module.exports = {
  removeEl
}
