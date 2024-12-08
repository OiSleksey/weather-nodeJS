#!/usr/bin/env mode
import { getArgs } from './helpers/args.js'
import { printError, printSucsess, printHelp } from './services/log.servise.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'
import { getWeather } from './services/api.service.js'

const saveToken = async (token) => {
  if (!token.length) {
    printError('Please write token')
  } else {
    try {
      await saveKeyValue(TOKEN_DICTIONARY.token, token)
      printSucsess('Token saved')
    } catch (e) {
      printError(e.message)
    }
  }
}

const getForcast = async () => {
  try {
    const weather = await getWeather('lviv')
    console.log(weather)
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

const initCLI = () => {
  const args = getArgs(process.argv)
  if (args.h) {
    //Display help
    printHelp()
  }
  if (args.s) {
    //Save city
  }
  if (args.t) {
    //Save token
    return saveToken(args.t)
  }
  getForcast()
  //Display weather
}

initCLI()
