import React, { useCallback } from 'react'
import {
  Box,
  Container,
  Grid,
  Button,
  useMediaQuery,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import YumeCoderLogo from '../../../assets/imgs/logos/yumecoderlogo_white.png'
import { useHistory } from 'react-router-dom'
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { LocaleKey } from '../../locales'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '&::before': {
      display: 'table',
      content: '""',
    },
    '&::after': {
      display: 'table',
      content: '""',
      clear: 'both',
    },
  },
  centerBox: {
    height: '60%',
    width: '70%',
    maxWidth: theme.breakpoints.width('sm'),
  },
  centerBoxTop: {
    marginBottom: 30,
    [theme.breakpoints.up('md')]: {
      marginBottom: 70,
    },
  },
  logo: {
    width: '100%',
  },
  appName: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 700,
    marginTop: '-15px',

    '&.wideTypeFont': {
      textIndent: '1rem',
      letterSpacing: '1rem',
    },
  },
  appKeyword: {
    color: '#dedede',
    textAlign: 'center',
    fontWeight: 500,

    '&.wideTypeFont': {
      textIndent: '0.15rem',
      letterSpacing: '0.15rem',
    },
  },
  btnLogin: {
    color: '#fff',
  },
  btnRegist: {
    color: '#fff',
    backgroundColor:
      theme.palette.indexPageGrey && theme.palette.indexPageGrey.light,

    '&:hover': {
      backgroundColor:
        theme.palette.indexPageGrey && theme.palette.indexPageGrey.light,
    },
  },
}))

interface UseIndexPageReturn {
  handleBtnLoginClick(): void
  handleBtnRegistClick(): void
  isWideTypeFont: boolean
}

export function useIndexPage(): UseIndexPageReturn {
  const history = useHistory()
  const locale = useSelector(({ localeState }) => localeState.locale)

  const wideTypeFonts: LocaleKey[] = ['zh-cn', 'ja-jp']
  const isWideTypeFont = wideTypeFonts.includes(locale)

  const handleBtnLoginClick = useCallback(() => {
    history.push('/login')
  }, [history])
  const handleBtnRegistClick = useCallback(() => {
    history.push('/regist')
  }, [history])

  return {
    handleBtnLoginClick,
    handleBtnRegistClick,
    isWideTypeFont,
  }
}

export default function IndexPage(): JSX.Element {
  const isLandscape = useMediaQuery('screen and (orientation:landscape)')
  const classes = useStyles()
  const {
    handleBtnLoginClick,
    handleBtnRegistClick,
    isWideTypeFont,
  } = useIndexPage()

  return (
    <Box clone minHeight="100vh" bgcolor="indexPageGrey.main">
      <Container disableGutters maxWidth={false} className={classes.root}>
        <Grid
          container
          direction="column"
          spacing={2}
          wrap="nowrap"
          className={classes.centerBox}
        >
          <Grid item className={classes.centerBoxTop}>
            <Box textAlign="center">
              <img
                src={YumeCoderLogo}
                alt="YumeCoderLogo"
                className={classes.logo}
                style={{ width: isLandscape ? '50%' : undefined }}
              />
            </Box>
            <Typography
              variant="h5"
              component="h1"
              className={`${classes.appName} ${
                isWideTypeFont ? 'wideTypeFont' : ''
              }`}
            >
              <FormattedMessage id="indexPageAppName" defaultMessage="码梦人" />
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
              className={`${classes.appKeyword} ${
                isWideTypeFont ? 'wideTypeFont' : ''
              }`}
            >
              <FormattedMessage
                id="indexPageAppKeyWord"
                defaultMessage="在线IT练习平台"
              />
            </Typography>
          </Grid>
          <Grid item container direction="row" spacing={2}>
            <Grid item xs={isLandscape ? 6 : 12}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                className={classes.btnLogin}
                onClick={handleBtnLoginClick}
              >
                <FormattedHTMLMessage
                  id="indexPageBtnLogin"
                  defaultMessage="登&nbsp;&nbsp;录"
                />
              </Button>
            </Grid>
            <Grid item xs={isLandscape ? 6 : 12}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                className={classes.btnRegist}
                onClick={handleBtnRegistClick}
              >
                <FormattedHTMLMessage
                  id="indexPageBtnRegist"
                  defaultMessage="注&nbsp;&nbsp;册"
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
