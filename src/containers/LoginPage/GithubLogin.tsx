import React from 'react'
import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import oauthLoginConfig from '../../configs/oauthLogin.config'

const githubClientId = oauthLoginConfig.github.clientId
const githubOauthUrl = oauthLoginConfig.github.oauthUrl
const redirectUri = oauthLoginConfig.github.redirectUri

const useStyles = makeStyles({
  githubIcon: {
    fontSize: 55,
    color: '#000',
  },
})

export default function GithubLogin(): JSX.Element {
  const classes = useStyles()

  return (
    <Box clone textAlign="center">
      <Grid item xs={4}>
        <IconButton
          aria-label="sign in with github"
          component="a"
          href={`${githubOauthUrl}?client_id=${githubClientId}&scope=user:email${redirectUri &&
            '&redirect_uri=' + redirectUri}`}
        >
          <Typography
            component="span"
            className={`fa-github ${classes.githubIcon}`}
          ></Typography>
        </IconButton>
      </Grid>
    </Box>
  )
}
