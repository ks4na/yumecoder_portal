import React from 'react'
import styles from './App.scss'
import { Button, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

export default function App() {
  console.log(styles)
  return (
    <div>
      <h2 className="header">test Material UI</h2>

      <Tooltip title="Add" placement="top">
        <Button variant="contained" startIcon={<DeleteIcon />}>
          Talk
        </Button>
      </Tooltip>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function testEslint() {
  let a = 1,
    b = '2'
  return a + b
}
