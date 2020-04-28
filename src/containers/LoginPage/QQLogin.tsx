import React from 'react'
import { Box, Grid, IconButton } from '@material-ui/core'
import QQLogo from '../../../assets/imgs/third-party-login/qq.png'

export default function QQLogin(): JSX.Element {
  return (
    <Box clone textAlign="center">
      <Grid item xs={4}>
        <IconButton aria-label="sign in with QQ">
          <Box clone width={55}>
            <img src={QQLogo} alt="qq_logo" />
          </Box>
        </IconButton>
      </Grid>
    </Box>
  )
}
