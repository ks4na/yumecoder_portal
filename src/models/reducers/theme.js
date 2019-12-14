import { createMuiTheme } from '@material-ui/core/styles'

const initialState = createMuiTheme({
  palette: {
    type: 'light',
    primary: { main: '#08B292' },
    secondary: { main: '#FF9100' },
  },
})

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
