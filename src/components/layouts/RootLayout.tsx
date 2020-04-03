import React from 'react'
import Container from '@material-ui/core/Container'
import styles from './RootLayout.scss'

interface PropTypes {
  children: React.ReactNode
}

export default function RootLayout({ children }: PropTypes): JSX.Element {
  return (
    <Container maxWidth="sm" className={styles.rootLayout}>
      {children}
    </Container>
  )
}
