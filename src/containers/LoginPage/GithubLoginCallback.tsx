import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useLocation } from 'react-router-dom'

export default function GithubLoginCallback(): JSX.Element {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const code = searchParams.get('code')

  return (
    <Box>
      <Typography variant="h6" component="h2">
        正在处理github登录请求...
      </Typography>
      <Typography variant="body1">{code}</Typography>
    </Box>
  )
}
