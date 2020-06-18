import React from 'react'
import { Container, ContainerProps } from '@material-ui/core'

export interface PropTypes extends ContainerProps {
  children: React.ReactNode
}

export default function BodyLayout({
  children,
  ...otherProps
}: PropTypes): JSX.Element {
  return (
    <Container maxWidth="md" {...otherProps}>
      {children}
    </Container>
  )
}
