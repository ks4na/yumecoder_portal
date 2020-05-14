import React from 'react'
import {
  Grid,
  Box,
  ButtonBase,
  makeStyles,
  PaletteType,
  useTheme,
  Tooltip,
} from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import DarkThemeIcon from '@material-ui/icons/Brightness4'
import LightThemeIcon from '@material-ui/icons/Brightness5'
import LanguageIcon from '@material-ui/icons/Language'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useSelector, useDispatch } from 'react-redux'
import {
  sagaSaveTypeToLocal,
  sagaRequestLogout,
} from '../../../../models/actions'
import LanguageChooseMenu from '../../../LangChooseMenu'
import { Status } from '../../../../models/reducers/status'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  customedBtn: {
    width: '100%',
    textTransform: 'uppercase',
    height: theme.spacing(6),
    lineHeight: `${theme.spacing(6)}px`,
    fontSize: '1rem',
    color: theme.palette.text.secondary,
  },
}))

export default function DrawerFooter(): JSX.Element {
  const classes = useStyles()
  const theme = useTheme()

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { themeType, toggleThemeType } = useThemeTypeHook()
  const {
    anchorEl,
    changeAnchorEl,
    handleShowMenu,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useLanguageChooseMenuHook()

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { isProgressing, handleRequestLogout } = useLogoutHook()

  return (
    <>
      <Box
        clone
        position="absolute"
        bottom={0}
        left={0}
        bgcolor="background.paper"
        borderTop={`1px solid ${theme.palette.divider}`}
      >
        <Grid container wrap="nowrap">
          <Grid item xs={6}>
            <ButtonBase
              className={classes.customedBtn}
              onClick={toggleThemeType}
              aria-label="toggle light/dark theme"
            >
              {themeType === 'light' ? <DarkThemeIcon /> : <LightThemeIcon />}
              <Box component="span" marginLeft={1}>
                {themeType === 'light' ? (
                  <FormattedMessage
                    id="test.testMenu.navDrawer.footer.txtDarkMode"
                    defaultMessage="夜间模式"
                  />
                ) : (
                  <FormattedMessage
                    id="test.testMenu.navDrawer.footer.txtLightMode"
                    defaultMessage="日间模式"
                  />
                )}
              </Box>
            </ButtonBase>
          </Grid>
          <Grid item xs>
            <Tooltip
              arrow
              title={
                <FormattedMessage
                  id="test.testMenu.navDrawer.footer.tooltipBtnChangeLanguage"
                  defaultMessage="切换语言"
                />
              }
            >
              <ButtonBase
                className={classes.customedBtn}
                aria-haspopup="true"
                aria-controls="change-language-menu"
                aria-label="change language"
                onClick={handleShowMenu}
              >
                <LanguageIcon />
              </ButtonBase>
            </Tooltip>
          </Grid>
          <Grid item xs>
            <Tooltip
              arrow
              title={
                <FormattedMessage
                  id="test.testMenu.navDrawer.footer.tooltipBtnLogout"
                  defaultMessage="退出"
                />
              }
            >
              <ButtonBase
                className={classes.customedBtn}
                onClick={isProgressing ? undefined : handleRequestLogout}
              >
                <ExitToAppIcon />
              </ButtonBase>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
      {/* LanguageChooseMenu */}
      <LanguageChooseMenu
        id="change-language-menu"
        anchorEl={anchorEl}
        changeAnchorEl={changeAnchorEl}
      />
    </>
  )
}

// useThemeTypeHook
export function useThemeTypeHook(): ThemeTypeHookReturnType {
  const themeType = useSelector(
    ({ themeState }) => themeState.theme.palette.type
  )
  const dispatch = useDispatch()

  const toggleThemeType = React.useCallback((): void => {
    dispatch(sagaSaveTypeToLocal(themeType === 'dark' ? 'light' : 'dark'))
  }, [dispatch, themeType])

  return {
    themeType,
    toggleThemeType,
  }
}

export interface ThemeTypeHookReturnType {
  themeType: PaletteType
  toggleThemeType: () => void
}

// useLanguageChooseMenuHook
export function useLanguageChooseMenuHook(): LanguageChooseMenuHookReturnType {
  const [anchorEl, setAnchorEl] = React.useState<
    null | Element | ((element: Element) => Element)
  >()

  const changeAnchorEl = React.useCallback(
    (anchorEl: null | Element | ((element: Element) => Element)): void => {
      setAnchorEl(anchorEl)
    },
    []
  )

  const handleShowMenu = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      setAnchorEl(e.currentTarget)
    },
    []
  )

  return {
    anchorEl,
    changeAnchorEl,
    handleShowMenu,
  }
}

export interface LanguageChooseMenuHookReturnType {
  anchorEl: null | Element | ((element: Element) => Element) | undefined
  changeAnchorEl: (
    anchorEl: null | Element | ((element: Element) => Element)
  ) => void
  handleShowMenu: (e: React.MouseEvent<HTMLButtonElement>) => void
}

// useLogoutHook
export function useLogoutHook(): LogoutHookReturnType {
  const dispatch = useDispatch()
  const history = useHistory()
  const logoutStatus = useSelector(({ logoutState }) => logoutState.status)
  const isProgressing = logoutStatus === Status.PROGRESSING

  const handleRequestLogout = React.useCallback((): void => {
    dispatch(sagaRequestLogout())
  }, [dispatch])

  // 监听 logoutStatus 变化
  React.useEffect((): void => {
    // 状态为 SUCCESS 则跳转到 首页
    if (logoutStatus === Status.SUCCESS) {
      history.push('/')
    }
  }, [history, logoutStatus])

  return {
    isProgressing,
    handleRequestLogout,
  }
}

export interface LogoutHookReturnType {
  isProgressing: boolean
  handleRequestLogout: () => void
}
