import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import IconBtnBack from '../../../components/Appbar/IconBtnBack'
import CommonAppbarTitle from '../../../components/Appbar/CommonTitle'

export default function ProfileHeader(): JSX.Element {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {/* iconButton back */}
          <IconBtnBack />
          {/* title */}
          <CommonAppbarTitle>
            <FormattedMessage
              id="home.settings.header.title"
              defaultMessage="设置"
            />
          </CommonAppbarTitle>
        </Toolbar>
      </AppBar>
      {/* fix position="fixed" */}
      <Toolbar />
    </>
  )
}
