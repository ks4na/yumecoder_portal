import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    minWidth: 320,
  },
  clearfix: {
    '&::before': {
      content: '""',
      display: 'table',
    },
    '&::after': {
      content: '""',
      display: 'table',
      clear: 'both',
    },
  },
})

interface PropTypes {
  children?: React.ReactNode
}

export default function RootLayout({ children }: PropTypes): JSX.Element {
  const classes = useStyles()
  return (
    <Container disableGutters className={`${classes.root} ${classes.clearfix}`}>
      {children}
    </Container>
  )
}
