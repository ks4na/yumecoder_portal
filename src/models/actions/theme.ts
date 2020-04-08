import { PaletteType } from '@material-ui/core'
export const ALTER_THEME_TYPE = 'ALTER_THEME_TYPE'
export type ALTER_THEME_TYPE = typeof ALTER_THEME_TYPE

export interface AlterThemeTypeAction {
  type: ALTER_THEME_TYPE
  payload: PaletteType
}

export function alterThemeType(themeType: PaletteType): AlterThemeTypeAction {
  return {
    type: ALTER_THEME_TYPE,
    payload: themeType,
  }
}

export type ThemeActions = AlterThemeTypeAction

//////////
// sagas
//////////

export const SAGA_SAVE_TYPE_TO_LOCAL = 'SAGA_SAVE_TYPE_TO_LOCAL'
export type SAGA_SAVE_TYPE_TO_LOCAL = typeof SAGA_SAVE_TYPE_TO_LOCAL

export interface SagaSaveTypeToLocalAction {
  type: SAGA_SAVE_TYPE_TO_LOCAL
  payload: PaletteType
}

export function sagaSaveTypeToLocal(
  themeType: PaletteType
): SagaSaveTypeToLocalAction {
  return {
    type: SAGA_SAVE_TYPE_TO_LOCAL,
    payload: themeType,
  }
}
