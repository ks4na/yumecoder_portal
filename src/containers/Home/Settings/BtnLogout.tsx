import React from 'react'
import { makeStyles, Box, Button } from '@material-ui/core'
import useLogoutHook from '../../../components/hooks/useLogoutHook'
import { FormattedHTMLMessage } from 'react-intl'

const useStyles = makeStyles(theme => ({
  btnLogout: {
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.main,

    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },

    '@media (hover: none)': {
      '&:hover': {
        backgroundColor: theme.palette.error.main,
      },
    },
  },
}))

export default function BtnLogout(): JSX.Element {
  const classes = useStyles()
  const { handleRequestLogout } = useLogoutHook()

  return (
    <Box marginY={2} paddingX={2}>
      <Button
        fullWidth
        size="large"
        variant="contained"
        color="primary"
        className={classes.btnLogout}
        onClick={handleRequestLogout}
      >
        <FormattedHTMLMessage
          id="home.settings.btnLogout"
          defaultMessage="退&nbsp;出&nbsp;登&nbsp;录"
        />
      </Button>
    </Box>
  )
}
