import React from 'react'
import { Box, Typography } from '@material-ui/core'

export interface CommonTitleProps {
  children?: React.ReactNode
}

export default function CommonTitle({
  children,
}: CommonTitleProps): JSX.Element {
  return (
    <Box clone flexGrow={1} pl={1}>
      <Typography component="h2" variant="h6" noWrap>
        {children}
      </Typography>
    </Box>
  )
}
