import React from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  smallSize: {
    fontSize: '1rem',
  },
})

export interface CommonTitleProps {
  children?: React.ReactNode
  smallSize?: boolean
}

export default function CommonTitle({
  children,
  smallSize = false,
}: CommonTitleProps): JSX.Element {
  const classes = useStyles()

  return (
    <Box clone flexGrow={1} pl={smallSize ? 0.5 : 1}>
      <Typography
        component="h2"
        variant="h6"
        noWrap
        className={(smallSize && classes.smallSize) || undefined}
      >
        {children}
      </Typography>
    </Box>
  )
}
