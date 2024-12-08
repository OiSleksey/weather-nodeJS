import { homedir, machine } from 'os'
import { join, basename, dirname, extname, relative, isAbsolute, resolve, sep } from 'path'
import { promises } from 'fs'

const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city',
}
const filePath = join(homedir(), 'weather-data.json')

const isExist = async (path) => {
  try {
    await promises.stat(path)
    return true
  } catch (e) {
    return false
  }
}

const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath)
    const data = JSON.parse(file)
    console.log('good ', data[key])
    return data[key]
  }
  console.log('bad')
  return undefined
}

const saveKeyValue = async (key, value) => {
  let data = {}
  if (await isExist(filePath)) {
    console.log('saveKeyValue')
    const file = await promises.readFile(filePath)
    data = JSON.parse(file)
  }
  data[key] = value
  await promises.writeFile(filePath, JSON.stringify(data))
}

// console.log(filePath)
// console.log(basename(filePath))
// console.log(dirname(filePath))
// console.log(extname(filePath))
// console.log(relative(filePath, dirname(filePath)))
// console.log(isAbsolute(filePath))
// console.log(resolve('..'))
// console.log(sep)

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY }
