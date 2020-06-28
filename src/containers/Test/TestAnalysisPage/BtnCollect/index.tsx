import React from 'react'
import { IconButton, makeStyles, Tooltip, Box } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { useSelector, useDispatch } from 'react-redux'
import useShownQuestionsHook from '../useShownQuestionsHook'
import { AnalysisDataQuestionCollectStatus as CollectStatus } from '../../../../models/reducers/tests/testAnalysis'
import { Status } from '../../../../models/reducers/status'
import {
  sagaUpdateCollectStatus,
  sagaCancelUpdateCollectStatus,
} from '../../../../models/actions'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles(theme => ({
  iconBtnRoot: {
    padding: theme.spacing(1),
  },
  icon: {
    fontSize: theme.typography.pxToRem(30),
  },
}))

export default function BtnCollect(): JSX.Element {
  const classes = useStyles()
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { disableBtn, hasCollected, handleToggleCollect } = useBtnCollectHook()
  const a11yLabel = hasCollected
    ? 'remove from collection'
    : 'add to collection'
  const tooltipText = hasCollected ? (
    <FormattedMessage
      id="test.testAnalysisPage.btnCollect.txtRemoveFromCollection"
      defaultMessage="取消收藏"
    />
  ) : (
    <FormattedMessage
      id="test.testAnalysisPage.btnCollect.txtAddToCollection"
      defaultMessage="添加到收藏"
    />
  )

  return (
    <>
      <Tooltip title={tooltipText} placement="bottom">
        <Box component="span" className="btn-wrapper">
          <IconButton
            edge="end"
            aria-label={a11yLabel}
            color="inherit"
            disabled={disableBtn}
            onClick={handleToggleCollect}
            className={classes.iconBtnRoot}
          >
            {hasCollected ? (
              <StarIcon color="secondary" className={classes.icon} />
            ) : (
              <StarBorderIcon className={classes.icon} />
            )}
          </IconButton>
        </Box>
      </Tooltip>
    </>
  )
}

export function useBtnCollectHook(): BtnCollectHookReturnType {
  const dispatch = useDispatch()
  const currentCollectRequestStatusRef = React.useRef<Status>(Status.INITIAL)
  const { tabIndex, collectRequestStatus } = useSelector(
    ({ testAnalysisState }) => testAnalysisState
  )
  currentCollectRequestStatusRef.current = collectRequestStatus
  const { shownQuestions } = useShownQuestionsHook()

  const disableBtn =
    !shownQuestions.length || collectRequestStatus === Status.PROGRESSING

  const hasCollected =
    (shownQuestions[tabIndex] &&
      shownQuestions[tabIndex].isCollected === CollectStatus.COLLECTED) ||
    false

  const handleToggleCollect = React.useCallback(() => {
    if (shownQuestions[tabIndex]) {
      const { id, isCollected } = shownQuestions[tabIndex]
      const newCollectStatus =
        isCollected === CollectStatus.COLLECTED
          ? CollectStatus.NOT_COLLECTED
          : CollectStatus.COLLECTED
      dispatch(sagaUpdateCollectStatus(id, newCollectStatus))
    }
  }, [dispatch, shownQuestions, tabIndex])

  // unmount 组件时，取消正在进行中的请求
  React.useEffect(() => {
    return (): void => {
      if (currentCollectRequestStatusRef.current === Status.PROGRESSING) {
        dispatch(sagaCancelUpdateCollectStatus())
      }
    }
  }, [dispatch])

  return {
    disableBtn,
    hasCollected,
    handleToggleCollect,
  }
}

export interface BtnCollectHookReturnType {
  disableBtn: boolean
  hasCollected: boolean
  handleToggleCollect: () => void
}
