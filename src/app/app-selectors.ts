import { AppRootState } from './store.ts'

export const SelectAppStatus = (state: AppRootState) => state.app.status
export const SelectAppError = (state: AppRootState) => state.app.error