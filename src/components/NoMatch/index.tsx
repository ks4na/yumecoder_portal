import React from 'react'
import { useLocation } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  pathname: {
    fontWeight: theme.typography.fontWeightBold,
  },
}))

export default function NoMatch(): JSX.Element {
  const location = useLocation()
  const classes = useStyles()
  return (
    <>
      <Typography variant="h2" gutterBottom align="center">
        Page 404
      </Typography>
      <Typography variant="body1" align="center">
        Page not found:
      </Typography>
      <Typography variant="body1" align="center" className={classes.pathname}>
        {location.pathname}
      </Typography>
    </>
  )
}
