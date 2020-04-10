import React from 'react'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import { useSelector, useDispatch } from 'react-redux'
import { sagaSaveTypeToLocal } from '../../models/actions'

const styles = {
  header: {
    fontSize: 30,
  },
}

export default function TestMaterialDesign(): JSX.Element {
  const theme = useSelector(({ themeState }) => themeState.theme)
  const dispatch = useDispatch()

  const handleToggleTheme = function(): void {
    const newThemeType = theme.palette.type === 'light' ? 'dark' : 'light'
    dispatch(sagaSaveTypeToLocal(newThemeType))
  }

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
      <Button variant="contained" color="primary" onClick={handleToggleTheme}>
        toggle theme
      </Button>
    </>
  )
}
