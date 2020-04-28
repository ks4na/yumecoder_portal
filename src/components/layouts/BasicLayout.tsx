import React from 'react'
import { Container, Box, BoxProps } from '@material-ui/core'

interface PropTypes extends BoxProps {
  children: React.ReactNode
}

export default function BasicLayout({
  children,
  ...otherProps
}: PropTypes): JSX.Element {
  return (
    <Box
      clone
      minHeight="100%"
      position="relative"
      overflow="hidden"
      bgcolor="background.default"
      {...otherProps}
    >
      <Container disableGutters maxWidth={false}>
        {children}
      </Container>
    </Box>
  )
}
