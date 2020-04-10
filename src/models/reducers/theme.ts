import { createMuiTheme, Theme } from '@material-ui/core/styles'
import { ThemeActions, ALTER_THEME_TYPE } from '../actions'
import { teal, orange } from '@material-ui/core/colors'

export interface ThemeState {
  theme: Theme
}

// get themeType from localstorage
const themeTypeFromLocal = localStorage.getItem('themeType')

const initialState: ThemeState = {
  theme: createMuiTheme({
    palette: {
      primary: teal,
      secondary: orange,
      type: themeTypeFromLocal !== 'dark' ? 'light' : 'dark',
    },
  }),
}

export default function themeReducer(
  state = initialState,
  action: ThemeActions
): ThemeState {
  switch (action.type) {
    case ALTER_THEME_TYPE:
      return {
        ...state,
        theme: {
          ...state.theme,
          palette: { ...state.theme.palette, type: action.payload },
        },
      }
    default:
      return state
  }
}
