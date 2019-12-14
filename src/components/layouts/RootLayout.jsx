import React from 'react'
import Container from '@material-ui/core/Container'
import styles from './RootLayout.scss'

export default function RootLayout({ children }) {
  return (
    <Container maxWidth="sm" className={styles.rootLayout}>
      {children}
    </Container>
  )
}
