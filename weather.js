#!/usr/bin/env mode
import { getArgs } from './helpers/args.js'
import { printError, printSucsess, printHelp, printWeather } from './services/log.servise.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'
import { getWeather, getNameValue } from './services/api.service.js'

const getToken = async () => {
  try {
    const tokenSave = await getNameValue(TOKEN_DICTIONARY.token)
    printSucsess(`Your token ${tokenSave}`)
  } catch (e) {
    printError('Not found token. Please write token')
  }
}

const getCity = async () => {
  try {
    const citySave = await getNameValue(TOKEN_DICTIONARY.city)
    printSucsess(`Your city ${citySave}`)
  } catch (e) {
    printError('Not found city. Please write city')
  }
}

const saveToken = async (token) => {
  if (!token.length) {
    checkToken()
  } else {
    try {
      await saveKeyValue(TOKEN_DICTIONARY.token, token)
      printSucsess('Token saved')
    } catch (e) {
      printError(e.message)
    }
  }
}

const saveCity = async (city) => {
  if (!city.length) {
    getCity()
  } else {
    try {
      await saveKeyValue(TOKEN_DICTIONARY.city, city)
      printSucsess('City saved')
    } catch (e) {
      printError(e.message)
    }
  }
}

const getForcast = async () => {
  try {
    const weather = await getWeather()
    printWeather(weather)
  } catch (e) {
    if (e?.response?.status == 404) {
      printError('Not found city')
    } else if (e?.response?.status == 401) {
      printError('Error token')
    } else {
      printError(e?.message)
    }
  }
}

const initCLI = async () => {
  const args = getArgs(process.argv)
  if (args.h) {
    //Display help
    return printHelp()
  }
  if (args.s) {
    //Save city
    typeof args.s === 'boolean' ? getCity() : saveCity(args.s)
  }
  if (args.t) {
    //Save token
    typeof args.t === 'boolean' ? getToken() : saveToken(args.t)
  }
  if (typeof args.h !== 'boolean' && typeof args.s !== 'boolean' && typeof args.t !== 'boolean') {
    getForcast()
  }

  //Display weather
}

initCLI()
