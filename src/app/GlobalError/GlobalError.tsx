import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../store.ts'
import { SelectAppError } from '../app-selectors.ts'
import { setAppErrorAC } from '../app-reducer.ts'

export const GlobalError = () => {
  const errorMessage = useAppSelector(SelectAppError)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(setAppErrorAC(null))
    }
  }, [errorMessage])

  return <ToastContainer theme="dark" autoClose={3000} />
}
