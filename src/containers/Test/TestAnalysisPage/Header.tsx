import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import CommonTitle from '../../../components/Appbar/CommonTitle'
import IconBtnBack from '../../../components/Appbar/IconBtnBack'
import BtnCollect from './BtnCollect'

export default function Header(): JSX.Element {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconBtnBack />
          <CommonTitle>
            <FormattedMessage
              id="test.testAnalysisPage.header.txtTitle"
              defaultMessage="试题解析"
            />
          </CommonTitle>
          {/* btn collect */}
          <BtnCollect />
        </Toolbar>
      </AppBar>
      {/* fix position="fixed" */}
      <Toolbar />
    </>
  )
}
