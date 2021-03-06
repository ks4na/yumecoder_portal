import React from 'react'
import styles from './CompOne.scss'
import BabelLogo from '../../../assets/imgs/logos/babel.svg'

function CompOne(): JSX.Element {
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>Comp One</h3>
        <p className={styles.body}>this is Comp One</p>
        <img src={BabelLogo} alt="babel logo" />
      </div>
    </>
  )
}

export default CompOne
