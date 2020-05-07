import {
  createMuiTheme,
  Theme,
  ThemeOptions,
  SimplePaletteColorOptions,
} from '@material-ui/core/styles'
import { ThemeActions, ALTER_THEME_TYPE } from '../actions'
import { teal, orange } from '@material-ui/core/colors'

// 添加自定义的全局颜色变量声明
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    indexPageGrey?: SimplePaletteColorOptions
  }

  interface PaletteOptions {
    indexPageGrey?: SimplePaletteColorOptions
  }
}

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
    indexPageGrey: {
      main: '#32373D',
      light: '#3B4048',
    },
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
