import React from 'react'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'

const styles = {
  header: {
    fontSize: 30,
  },
}

export default function TestMaterialDesign() {
  return (
    <>
      <h2 style={styles.header}>test Material UI</h2>
      <Tooltip title="Delete" placement="top">
        <Button variant="contained" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </Tooltip>
      <Button variant="contained" color="primary">
        PRIMARY
      </Button>
      <Button variant="contained" color="secondary">
        SECOND
      </Button>
    </>
  )
}
