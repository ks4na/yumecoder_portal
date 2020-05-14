import React from 'react'
import DefaultAvatar from '../../../../../assets/imgs/defaultavatar.png'
import {
  Box,
  Avatar,
  Typography,
  Grid,
  makeStyles,
  Link as MuiLink,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Status } from '../../../../models/reducers/status'
import { Skeleton } from '@material-ui/lab'

export interface DrawerHeaderProps {
  nickname?: string
  avatar?: string
  personalSignature?: string
  status: Status
}

const useStyles = makeStyles(theme => ({
  nickname: {
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.common.white,
  },
  personalizedSignature: {
    wordBreak: 'break-all',
    color: theme.palette.common.white,
  },
}))

export default function DrawerHeader({
  nickname,
  avatar,
  personalSignature,
  status,
}: DrawerHeaderProps): JSX.Element {
  const classes = useStyles()
  const isLoading = status === Status.PROGRESSING

  return (
    <Box bgcolor="primary.main" padding={2}>
      <Box marginBottom={1}>
        <Grid container>
          <Grid item xs={3}>
            {isLoading ? (
              <Skeleton variant="circle" width={40} height={40} />
            ) : (
              <MuiLink component={Link} to="/home">
                <Avatar src={avatar || DefaultAvatar} alt="avatar" />
              </MuiLink>
            )}
          </Grid>
          <Grid item xs={9} container alignItems="center">
            {isLoading ? (
              <Box clone width="50%">
                <Skeleton variant="text" />
              </Box>
            ) : (
              <MuiLink component={Link} to="/home">
                <Typography variant="body2" className={classes.nickname} noWrap>
                  {nickname}
                </Typography>
              </MuiLink>
            )}
          </Grid>
        </Grid>
      </Box>

      {isLoading ? (
        <Skeleton variant="text" />
      ) : (
        <MuiLink component={Link} to="/home">
          <Typography variant="body2" className={classes.personalizedSignature}>
            {personalSignature || (
              <FormattedMessage
                id="test.testMenu.navDrawer.txtNoPersonalizedSignature"
                defaultMessage="还没有个人签名"
              />
            )}
          </Typography>
        </MuiLink>
      )}
    </Box>
  )
}
