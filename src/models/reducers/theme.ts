import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core/styles'
import { ThemeActions, ALTER_THEME_TYPE } from '../actions'
import { teal, orange } from '@material-ui/core/colors'

export interface ThemeState {
  theme: Theme
}

// get themeType from localstorage
const themeTypeFromLocal = localStorage.getItem('themeType')

const customedThemeOptions: ThemeOptions = {
  palette: {
    primary: teal,
    secondary: orange,
    type: themeTypeFromLocal !== 'dark' ? 'light' : 'dark',
  },
}

const initialState: ThemeState = {
  theme: createMuiTheme({
    palette: {
      ...customedThemeOptions.palette,
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
        theme: createMuiTheme({
          palette: { ...customedThemeOptions.palette, type: action.payload },
        }),
      }
    default:
      return state
  }
}
