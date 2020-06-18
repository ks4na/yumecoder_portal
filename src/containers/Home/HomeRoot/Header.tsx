import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import IconBtnBack from '../../../components/Appbar/IconBtnBack'
import CommonAppbarTitle from '../../../components/Appbar/CommonTitle'

export default function HomeRootHeader(): JSX.Element {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {/* iconbutton back */}
          <IconBtnBack />
          {/* title */}
          <CommonAppbarTitle>
            <FormattedMessage
              id="home.homeRoot.header.title"
              defaultMessage="个人中心"
            />
          </CommonAppbarTitle>
        </Toolbar>
      </AppBar>
      {/* fix position="fixed" */}
      <Toolbar />
    </>
  )
}
