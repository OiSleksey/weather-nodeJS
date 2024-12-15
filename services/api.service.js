import https from 'https'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'
import axios from 'axios'

// const url = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'

// //https Method
// const getWeather = async (city) => {
//   const token = await getKeyValue(TOKEN_DICTIONARY.token)
//   if (!token.length) {
//     throw new Error('Not found key API_KEY. Please set API_KEY via comand -t [API_KEY]')
//   }
//   const url = new URL('https://api.openweathermap.org/data/2.5/weather')
//   url.searchParams.append('q', city)
//   url.searchParams.append('appid', token)
//   url.searchParams.append('lang', 'ru')
//   url.searchParams.append('units', 'metric')

//   https.get(url, (response) => {
//     let res = ''
//     response.on('data', (chunk) => {
//       res += chunk
//       console.log(res)
//     })
//     response.on('end', () => {
//       console.log('END ', res)
//     })
//     response.on('error', (error) => {
//       console.log('ERROR ', error)
//     })
//   })
// }

//https axios
const getWeather = async () => {
  const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token))
  const city = await getKeyValue(TOKEN_DICTIONARY.city)
  if (!token.length) {
    throw new Error('Not found key API_KEY. Please set API_KEY via comand -t [API_KEY]')
  }
  // try {
  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      lang: 'ru',
      units: 'metric',
    },
  })
  // console.log(data)
  return data
  // } catch (error) {
  //   // console.log('ERROR', error)
  //   // return Promise.reject(error?.data?.message)

  //   throw new Error(error?.data?.message)
  // }
}

const getNameValue = async (key) => {
  try {
    const name = await getKeyValue(TOKEN_DICTIONARY?.[key])
    if (name) return name
    throw new Error(`Not found ${key}`)
  } catch (e) {
    throw new Error(`Not found ${key}`)
  }
}

export { getWeather, getNameValue }
