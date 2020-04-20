import React from 'react'
import { Container, Box } from '@material-ui/core'

interface PropTypes {
  children: React.ReactNode
}

export default function BasicLayout({ children }: PropTypes): JSX.Element {
  return (
    <Box
      clone
      minHeight="100%"
      position="relative"
      overflow="hidden"
      bgcolor="background.default"
    >
      <Container disableGutters maxWidth={false}>
        {children}
      </Container>
    </Box>
  )
}
