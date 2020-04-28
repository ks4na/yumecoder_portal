import { ComponentType } from 'react'
import { SnackbarProps } from '@material-ui/core'
import {
  SnackbarActions,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  ADD_SNACKBAR_ITEM,
  CHANGE_CURRENT_SNACKBAR,
  CHANGE_SNACKBAR_ITEMS,
} from '../actions'

export type SnackbarItemType = Omit<SnackbarProps, 'open'> &
  AugmentedSnackbarProps

export interface AugmentedSnackbarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messageComponent?: ComponentType<any>
  messageComponentProps?: object

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actionComponent?: ComponentType<any>
  actionComponentProps?: object
}

export interface SnackbarState {
  open: boolean
  snackbarItems: SnackbarItemType[]
  currentSnackbar?: SnackbarItemType
}

const initState: SnackbarState = {
  open: false,
  snackbarItems: [],
}

export default function snackbarReducer(
  state: SnackbarState = initState,
  action: SnackbarActions
): SnackbarState {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        ...state,
        open: true,
      }
    case CLOSE_SNACKBAR:
      return {
        ...state,
        open: false,
      }
    case ADD_SNACKBAR_ITEM:
      return {
        ...state,
        snackbarItems: [...state.snackbarItems, action.payload],
      }
    case CHANGE_CURRENT_SNACKBAR:
      return {
        ...state,
        currentSnackbar: action.payload,
      }
    case CHANGE_SNACKBAR_ITEMS:
      return {
        ...state,
        snackbarItems: action.payload,
      }
    default:
      return state
  }
}
