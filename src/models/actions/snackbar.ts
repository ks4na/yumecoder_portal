import { SnackbarItemType } from '../reducers/snackbar'

export const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
export type OPEN_SNACKBAR = typeof OPEN_SNACKBAR

export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
export type CLOSE_SNACKBAR = typeof CLOSE_SNACKBAR

export const ADD_SNACKBAR_ITEM = 'ADD_SNACKBAR_ITEM'
export type ADD_SNACKBAR_ITEM = typeof ADD_SNACKBAR_ITEM

export const CHANGE_CURRENT_SNACKBAR = 'CHANGE_CURRENT_SNACKBAR'
export type CHANGE_CURRENT_SNACKBAR = typeof CHANGE_CURRENT_SNACKBAR

export const CHANGE_SNACKBAR_ITEMS = 'CHANGE_SNACKBAR_ITEMS'
export type CHANGE_SNACKBAR_ITEMS = typeof CHANGE_SNACKBAR_ITEMS

export interface OpenSnackbarAction {
  type: OPEN_SNACKBAR
}

export interface CloseSnackbarAction {
  type: CLOSE_SNACKBAR
}

export interface AddSnackbarItemAction {
  type: ADD_SNACKBAR_ITEM
  payload: SnackbarItemType
}

export interface ChangeCurrentSnackbarAction {
  type: CHANGE_CURRENT_SNACKBAR
  payload?: SnackbarItemType
}

export interface ChangeSnackbarItemsAction {
  type: CHANGE_SNACKBAR_ITEMS
  payload: SnackbarItemType[]
}

export type SnackbarActions =
  | OpenSnackbarAction
  | CloseSnackbarAction
  | AddSnackbarItemAction
  | ChangeCurrentSnackbarAction
  | ChangeSnackbarItemsAction

//////////////////////
// action creators
//////////////////////

export function openSnackbar(): OpenSnackbarAction {
  return {
    type: OPEN_SNACKBAR,
  }
}

export function closeSnackbar(): CloseSnackbarAction {
  return {
    type: CLOSE_SNACKBAR,
  }
}

export function addSnackbarItem(
  snackbarItem: SnackbarItemType
): AddSnackbarItemAction {
  return {
    type: ADD_SNACKBAR_ITEM,
    payload: snackbarItem,
  }
}

export function changeCurrentSnackbar(
  newSnackbar?: SnackbarItemType
): ChangeCurrentSnackbarAction {
  return {
    type: CHANGE_CURRENT_SNACKBAR,
    payload: newSnackbar,
  }
}

export function changeSnackbarItems(
  newSnackbarItems: SnackbarItemType[]
): ChangeSnackbarItemsAction {
  return {
    type: CHANGE_SNACKBAR_ITEMS,
    payload: newSnackbarItems,
  }
}
