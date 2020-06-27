import React from 'react'
import { makeStyles, Box } from '@material-ui/core'
import BasicLayout from '../../../components/layouts/BasicLayout'
import BodyLayout from '../../../components/layouts/BodyLayout'
import Header from './Header'
import useTestAnalysisHook from './useTestAnalysisHook'
import Footer from './Footer'
import useTabIndexInitHook from './useTabIndexInitHook'
import useOnlyMistakeHook from './useOnlyMistakeInitHook'
import MainBody from './MainBody'

const useStyles = makeStyles(theme => ({
  mainBodyWrapper: {
    marginBottom: theme.mixins.testPageFooterHeight,
  },
}))

export default function TestAnalysisPage(): JSX.Element {
  const classes = useStyles()

  // 使用 testAnalysisHook ，处理 TestAnalysisPage 数据的加载/卸载逻辑
  useTestAnalysisHook()

  // 处理 URL 查询参数 tabIndex
  useTabIndexInitHook()

  // 处理 URL 查询参数 onlyMistake
  useOnlyMistakeHook()

  return (
    <>
      <BasicLayout>
        <Header />
        <BodyLayout disableGutters>
          <Box className={classes.mainBodyWrapper}>
            <MainBody />
          </Box>
        </BodyLayout>
        <Footer />
      </BasicLayout>
    </>
  )
}
