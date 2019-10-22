import React from 'react'
import styles from './App.scss'
import { Button, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

export default function App() {
  return (
    <div>
      <h2 className={styles.header}>test Material UI</h2>

      <Tooltip title="Add" placement="top">
        <Button variant="contained" startIcon={<DeleteIcon />}>
          Talk
        </Button>
      </Tooltip>
    </div>
  )
}
