import React from 'react'
import { Grid, Button, makeStyles, Divider } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { changeTabIndex } from '../../../models/actions'
import useShownQuestionsHook from './useShownQuestionsHook'

const useStyles = makeStyles(theme => ({
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: theme.mixins.testPageFooterHeight,
    backgroundColor: theme.palette.primary.main,
  },

  divider: {
    backgroundColor: theme.palette.background.default,
  },

  button: {
    height: '100%',
    borderRadius: 0,
    color: '#fff',
  },
}))

export default function Footer(): JSX.Element {
  const classes = useStyles()

  const {
    disableToPrevious,
    disableToNext,
    handleToPrevious,
    handleToNext,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useFooterHook()

  return (
    <Grid container className={classes.footer}>
      <Grid item xs>
        <Button
          fullWidth
          className={classes.button}
          disabled={disableToPrevious}
          onClick={handleToPrevious}
        >
          <FormattedMessage
            id="test.testAnalysisPage.footer.btnToPrevious"
            defaultMessage="上一题"
          />
        </Button>
      </Grid>
      <Divider orientation="vertical" flexItem className={classes.divider} />
      <Grid item xs>
        <Button
          fullWidth
          className={classes.button}
          disabled={disableToNext}
          onClick={handleToNext}
        >
          <FormattedMessage
            id="test.testAnalysisPage.footer.btnToNext"
            defaultMessage="下一题"
          />
        </Button>
      </Grid>
    </Grid>
  )
}

export function useFooterHook(): FooterHookReturnType {
  const dispatch = useDispatch()
  const { data, tabIndex } = useSelector(
    ({ testAnalysisState }) => testAnalysisState
  )

  // 获取需要展示的 questions
  const { shownQuestions } = useShownQuestionsHook()

  // 是否禁用 上一页、下一页 按钮
  const disableToPrevious = !data || tabIndex <= 0
  const disableToNext = !data || tabIndex >= shownQuestions.length - 1

  /**
   * 切换 显示的 panel
   */
  const handleChangeTabIndex = React.useCallback(
    (index: number) => {
      dispatch(changeTabIndex(index))
    },
    [dispatch]
  )

  const handleToPrevious = (): void => {
    handleChangeTabIndex(tabIndex - 1)
  }

  const handleToNext = (): void => {
    handleChangeTabIndex(tabIndex + 1)
  }

  // 监听 tabIndex 变化
  React.useEffect(() => {
    // 页面滚动到顶部
    window.scrollTo(0, 0)
  }, [tabIndex])

  return {
    disableToPrevious,
    disableToNext,
    handleToPrevious,
    handleToNext,
  }
}

export interface FooterHookReturnType {
  disableToPrevious: boolean
  disableToNext: boolean
  handleToPrevious: () => void
  handleToNext: () => void
}
