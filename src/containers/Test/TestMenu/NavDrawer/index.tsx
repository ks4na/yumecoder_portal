import React from 'react'
import { SwipeableDrawer, makeStyles, Icon, Box } from '@material-ui/core'

import NavList, { NavListItem } from './NavList'
import { FormattedMessage } from 'react-intl'
import DrawerHeader, { DrawerHeaderProps } from './Header'
import DrawerFooter from './Footer'
import { useSelector } from 'react-redux'

// drawer 宽度
const drawerWidth = 270

const isIOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

const useStyles = makeStyles({
  drawerPaper: {
    width: drawerWidth,
  },
  drawerTop: {
    overflowX: 'hidden',
    overflowY: 'auto',
  },
})

const navList: NavListItem[] = [
  {
    name: (
      <FormattedMessage
        id="test.testMenu.navDrawer.txtNavTestHistory"
        defaultMessage="历史练习"
      />
    ),
    icon: <Icon className="fa-my-practice" />,
    href: '/test/history',
  },
  {
    name: (
      <FormattedMessage
        id="test.testMenu.navDrawer.txtNavMistakes"
        defaultMessage="错题集"
      />
    ),
    icon: <Icon className="fa-mistakes" />,
    href: '/question/mistakes',
  },
  {
    name: (
      <FormattedMessage
        id="test.testMenu.navDrawer.txtNavCollection"
        defaultMessage="收藏的题目"
      />
    ),
    icon: <Icon className="fa-collection" />,
    href: '/question/collection',
    divider: true,
  },
  {
    name: (
      <FormattedMessage
        id="test.testMenu.navDrawer.txtNavNotification"
        defaultMessage="我的消息"
      />
    ),
    icon: <Icon className="fa-notification" />,
    href: '/message',
  },
  {
    name: (
      <FormattedMessage
        id="test.testMenu.navDrawer.txtNavHome"
        defaultMessage="个人中心"
      />
    ),
    icon: <Icon className="fa-home" />,
    href: '/home',
    divider: true,
  },
  {
    name: (
      <FormattedMessage
        id="test.testMenu.navDrawer.txtNavSettings"
        defaultMessage="设置"
      />
    ),
    icon: <Icon className="fa-settings" />,
    href: '/home/settings',
  },
]

export interface NavDrawerProps {
  open: boolean
  handleNavDrawerToggle: () => void
}

export default function NavDrawer({
  open,
  handleNavDrawerToggle,
}: NavDrawerProps): JSX.Element {
  const classes = useStyles()
  const { data, status } = useSelector(({ testMenuState }) => testMenuState)

  const drawerHeaderProps: DrawerHeaderProps = {
    nickname: data && data.user.nickname,
    avatar: data && data.user.avatar,
    personalSignature: data && data.user.personalSignature,
    status,
  }

  return (
    <SwipeableDrawer
      /* 非 ios 关闭背景遮罩层渐变效果 */
      disableBackdropTransition={!isIOS}
      /* ios 禁用侧边划入，所以触摸侧边不会划出部分 drawer */
      disableDiscovery={isIOS}
      open={open}
      onClose={handleNavDrawerToggle}
      onOpen={handleNavDrawerToggle}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <Box height="100%" marginBottom={6} className={classes.drawerTop}>
        <DrawerHeader {...drawerHeaderProps} />
        <NavList list={navList} />
      </Box>
      <DrawerFooter />
    </SwipeableDrawer>
  )
}
