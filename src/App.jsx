import React, { useState } from 'react'
import styles from './App.scss'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import CompOne from './components/CompOne.jsx'

export default function App() {
  const [compTwo, setCompTwo] = useState()
  const handleClick = async () => {
    const CompTwo = await import(
      /* webpackChunkName: 'CompTwo' */ './components/CompTwo.jsx'
    )
    setCompTwo(CompTwo.default)
  }
  return (
    <div>
      <h2 className={styles.header}>test Material UI</h2>
      <Tooltip title="Add" placement="top">
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleClick}
        >
          Talk
        </Button>
      </Tooltip>
      <CompOne />
      {compTwo}
    </div>
  )
}
