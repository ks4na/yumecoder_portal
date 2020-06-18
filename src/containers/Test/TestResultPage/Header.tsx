import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import CommonTitle from '../../../components/Appbar/CommonTitle'
import IconBtnBack from '../../../components/Appbar/IconBtnBack'
import { useHistory } from 'react-router-dom'

export default function Header(): JSX.Element {
  const history = useHistory()

  // 跳转到 练习主页面
  const handleToTestMenuPage = function(): void {
    history.push('/test/menu')
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconBtnBack onClick={handleToTestMenuPage} />
          <CommonTitle>
            <FormattedMessage
              id="test.testResultPage.header.txtTitle"
              defaultMessage="结果报告"
            />
          </CommonTitle>
        </Toolbar>
      </AppBar>
      {/* fix position="fixed" */}
      <Toolbar />
    </>
  )
}
