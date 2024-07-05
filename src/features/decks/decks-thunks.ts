import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppStatusAC } from '../../app/app-reducer.ts'
import axios, { Axios, AxiosError, isAxiosError } from 'axios'

export const fetchDecksTC = () => {
  return async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
      const res = await decksAPI.fetchDecks()
      dispatch(setDecksAC(res.data.items))
      dispatch(setAppStatusAC('succeeded'))
    } catch (err) {
      dispatch(setAppStatusAC('failed'))
    }
  }
}


export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

// case-1: ошибки бэкенда (на стороне бэкенда). Ошибку создаёт axios, в e.response.data помещает ответ сервера
// case-2: network error -- axios создаёт объект ошибки, сообщение можно взять из поля e.message
// case-3: синхронные ошибки -- создаётся "нативная" JS-ошибка, имеет поле e.message

//todo: вывести в консоль сообщение об ошибке учтя все кейсы
// взять и достать из объекта ошибки сообщение об ошибке

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
  } catch (err) {
    let errorMessage: string
    // if (axios.isAxiosError(err)) {
    //   if (err.code === 'ERR_INTERNET_DISCONNECTED') {
    //     errorMessage = 'No internet connection'
    //     console.log(errorMessage)
    //   } else if (err.response) {
    //     errorMessage = err.response.data.errorMessages?.[0]?.message
    //     console.log(errorMessage)
    //   }
    // } else {
    //   errorMessage = 'something went wrong'
    //   console.log(errorMessage)
    // }

    if (isAxiosError<ServerError>(err)) {
      errorMessage = err.response ? err.response.data.errorMessages[0].message : err.message
    } else {
      errorMessage = (err as Error).message
    }
    console.log(errorMessage)
  }
}

type ServerError = {
  errorMessages: Array<{ field: string, message: string }>
}

