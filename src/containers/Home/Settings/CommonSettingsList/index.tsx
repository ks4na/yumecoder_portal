import React from 'react'
import { Box, Paper, List } from '@material-ui/core'
import PasswordResetListItem from './PasswordReset'

export default function CommonSettingsList(): JSX.Element {
  return (
    <Box clone marginBottom={1}>
      <Paper square>
        <List aria-label="common settings list">
          {/* reset password */}
          <PasswordResetListItem />
        </List>
      </Paper>
    </Box>
  )
}
