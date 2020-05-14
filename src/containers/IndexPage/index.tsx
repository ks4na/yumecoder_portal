import React, { useCallback } from 'react'
import {
  Box,
  Container,
  Grid,
  Button,
  useMediaQuery,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import {
  makeStyles,
  useTheme,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles'
import YumeCoderLogo from '../../../assets/imgs/logos/yumecoderlogo_white.png'
import { useHistory } from 'react-router-dom'
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { LocaleKey } from '../../locales'
import LanguageIcon from '@material-ui/icons/Language'
import useLangChooseMenuAnchor from '../../components/hooks/useLangChooseMenuAnchor'
import LangChooseMenu from '../LangChooseMenu'

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
  iconChangeLanguage: {
    fontSize: theme.typography.pxToRem(30),
  },
  langChooseMenuBackground: {
    backgroundColor:
      theme.palette.indexPageGrey && theme.palette.indexPageGrey.light,
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

  // didmount
  // 检测是否已存在 token， 存在则跳转测试主页面
  React.useEffect((): void => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    if (accessToken || refreshToken) {
      history.push('/test/menu')
    }
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

  const {
    anchorEl,
    changeAnchorEl,
    handleShowLanguageChooseMenu,
  } = useLangChooseMenuAnchor()

  const theme = useTheme()
  const btnLangChooseTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  })

  return (
    <>
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
                <FormattedMessage
                  id="indexPageAppName"
                  defaultMessage="码梦人"
                />
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

      {/* btnChangeLanguage and LangChooseMenu */}
      <ThemeProvider theme={btnLangChooseTheme}>
        <Box position="fixed" top={theme.spacing(2)} right={theme.spacing(2)}>
          <Tooltip
            arrow
            title={
              <FormattedMessage
                id="indexPage.tooltipBtnChangeLanguage"
                defaultMessage="切换语言"
              />
            }
          >
            <IconButton
              size="medium"
              aria-haspopup="true"
              aria-controls="change-language-menu"
              aria-label="change language"
              onClick={handleShowLanguageChooseMenu}
            >
              <LanguageIcon className={classes.iconChangeLanguage} />
            </IconButton>
          </Tooltip>
          <LangChooseMenu
            classes={{ paper: classes.langChooseMenuBackground }}
            id="change-language-menu"
            anchorEl={anchorEl}
            changeAnchorEl={changeAnchorEl}
          />
        </Box>
      </ThemeProvider>
    </>
  )
}
