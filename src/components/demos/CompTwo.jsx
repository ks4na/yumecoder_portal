import React from 'react'
import styles from './CompTwo.scss'
import _ from 'lodash'

function CompTwo() {
  console.log(_.shuffle([1, 2, 3, 4]))
  return (
    <>
      <h2 className={styles.title}>gray title</h2>
      <div className={styles.container}>
        <h3 className={styles.title}>Comp Two</h3>
        <p className={styles.body}>this is Comp Two</p>
      </div>
    </>
  )
}

export default CompTwo
