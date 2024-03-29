
function isObject (value) {
  return value === Object(value)
}

function isArray (value) {
  return Array.isArray(value)
}

function isFile (value) {
  return value instanceof File
}

function makeArrayKey (key) {
    return key
}

function objectToFormData (obj, fd, pre) {
  fd = fd || new FormData()

  Object.keys(obj).forEach(function (prop) {
    var key = pre ? (pre + '[' + prop + ']') : prop

    if (isObject(obj[prop]) && !isArray(obj[prop]) && !isFile(obj[prop])) {
      objectToFormData(obj[prop], fd, key)
    } else if (isArray(obj[prop])) {
      obj[prop].forEach(function (value) {
        var arrayKey = makeArrayKey(key)

        if (isObject(value) && !isFile(value)) {
          objectToFormData(value, fd, arrayKey)
        } else {
          fd.append(arrayKey, value)
        }
      })
    } else {
      if(obj[prop]!=null)  fd.append(key, obj[prop])
    }
  })

  return fd
}

export default objectToFormData
