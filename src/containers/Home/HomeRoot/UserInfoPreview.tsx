import React from 'react'
import {
  Paper,
  Grid,
  Typography,
  Avatar,
  makeStyles,
  Box,
  useTheme,
  Link as MuiLink,
  Icon,
} from '@material-ui/core'
import DefaultAvatar from '../../../../assets/imgs/defaultavatar.png'
import RightIcon from '@material-ui/icons/ChevronRight'
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl'
import { Link, useRouteMatch } from 'react-router-dom'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  rightPart: {
    paddingLeft: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  nickname: {
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(20),
  },
  personalSignature: {
    color: theme.palette.grey[500],
  },
  rightIcon: {
    color: theme.palette.grey[500],
  },
  coloredNumber: {
    color: theme.palette.text.primary,
  },
  iconFriends: {
    marginRight: theme.spacing(0.75),

    '&::before': {
      fontSize: 18,
      position: 'relative',
      top: 2,
    },
  },
  divider: {
    width: 'unset',
  },
}))

export interface UserInfoPreviewProps {
  isLoading?: boolean
  avatar?: string
  nickname?: string
  personalSignature?: string
  follows?: number
  followers?: number
}

export default function UserInfoPreview({
  isLoading,
  avatar,
  nickname,
  personalSignature,
  follows,
  followers,
}: UserInfoPreviewProps): JSX.Element {
  const classes = useStyles()
  const theme = useTheme()
  const match = useRouteMatch()

  return (
    <Box clone marginBottom={2}>
      <Paper square>
        <MuiLink component={Link} to={`${match.url}/profile`} underline="none">
          <Grid container>
            <Box
              clone
              paddingLeft={3}
              paddingTop={2}
              paddingBottom={1}
              paddingRight={2}
            >
              <Grid item>
                {isLoading ? (
                  <Skeleton variant="circle" className={classes.avatar} />
                ) : (
                  <Avatar
                    src={avatar || DefaultAvatar}
                    alt="avatar"
                    className={classes.avatar}
                  />
                )}
              </Grid>
            </Box>
            <Grid item xs container zeroMinWidth className={classes.rightPart}>
              <Grid item xs container alignItems="center" zeroMinWidth>
                <Box clone paddingRight={1}>
                  <Grid item xs>
                    {isLoading ? (
                      <>
                        <Box clone marginBottom={0.5}>
                          <Skeleton
                            variant="rect"
                            width={100}
                            className={classes.nickname}
                          />
                        </Box>
                        <Skeleton />
                      </>
                    ) : (
                      <>
                        <Typography
                          gutterBottom
                          noWrap
                          className={classes.nickname}
                          color="textPrimary"
                        >
                          {nickname}
                        </Typography>
                        <Typography
                          variant="body2"
                          noWrap
                          className={classes.personalSignature}
                        >
                          {personalSignature || (
                            <FormattedMessage
                              id="home.homeRoot.userInfoPreview.txtNoPersonalizedSignature"
                              defaultMessage="还没有个人签名"
                            />
                          )}
                        </Typography>
                      </>
                    )}
                  </Grid>
                </Box>
              </Grid>
              <Grid item>
                <Box clone height="100%">
                  <Grid container alignItems="center">
                    <RightIcon fontSize="large" className={classes.rightIcon} />
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </MuiLink>
        {/* Follows and Followers */}
        <Box paddingY={1}>
          <Grid container>
            <Grid item xs container alignItems="center">
              <Grid item xs>
                <Typography align="center" color="primary">
                  <Icon className={`fa-follows ${classes.iconFriends}`} />
                  <MuiLink
                    component={Link}
                    to={`${match.url}/friends`}
                    underline="none"
                  >
                    <FormattedHTMLMessage
                      id="home.homeRoot.userInfoPreview.txtFollows"
                      defaultMessage='关注了 <span class="{ className }"> { number } </span> 人'
                      values={{
                        className: classes.coloredNumber,
                        number: follows || 0,
                      }}
                    />
                  </MuiLink>
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              className={classes.divider}
            >
              <Box clone height="100%">
                <Box
                  clone
                  width={0}
                  height="80%"
                  borderRight={`1px solid ${theme.palette.primary.main}`}
                >
                  <Grid item xs></Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xs container alignItems="center">
              <Grid item xs>
                <Typography align="center" color="primary">
                  <Icon className={`fa-followers ${classes.iconFriends}`} />
                  <MuiLink
                    component={Link}
                    to={`${match.url}/friends`}
                    underline="none"
                  >
                    <FormattedHTMLMessage
                      id="home.homeRoot.userInfoPreview.txtFollowers"
                      defaultMessage='关注者 <span class="{ className }"> { number } </span> 人'
                      values={{
                        className: classes.coloredNumber,
                        number: followers || 0,
                      }}
                    />
                  </MuiLink>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}
