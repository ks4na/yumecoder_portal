import React from 'react'
import Header from './Header'
import BasicLayout from '../../../components/layouts/BasicLayout'
import BodyLayout from '../../../components/layouts/BodyLayout'
import Footer from './Footer'
import { Box, makeStyles } from '@material-ui/core'
import TestResultBrief from './TestResultBrief'
import AchievementBar from './AchievementBar'
import QuestionViewShortcuts from './QuestionViewShortcuts'
import useTestResultHook from './useTestResultHook'

const useStyles = makeStyles(theme => ({
  mainBodyWrapper: {
    padding: theme.spacing(2, 0),
    marginBottom: theme.mixins.testPageFooterHeight,
  },
}))

export default function TestResultPage(): JSX.Element {
  const classes = useStyles()

  // 使用 testResultHook，处理 testResultState 的请求/重置
  useTestResultHook()

  return (
    <>
      <BasicLayout>
        <Header />
        <BodyLayout>
          <Box className={classes.mainBodyWrapper}>
            {/* 练习信息概览 */}
            <TestResultBrief />
            {/* 能力变化条 */}
            <AchievementBar />
            {/* 题目查看快捷入口 */}
            <QuestionViewShortcuts />
          </Box>
        </BodyLayout>
        <Footer />
      </BasicLayout>
    </>
  )
}
