import React from 'react'
import {
  Toolbar,
  Box,
  Slide,
  Button,
  makeStyles,
  Grid,
  IconButton,
  Dialog,
  AppBar,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import BodyLayout from '../../../../components/layouts/BodyLayout'
import { useSelector, useDispatch } from 'react-redux'
import { Type } from '../../../../models/reducers/tests/testPage'
import { FormattedMessage } from 'react-intl'
import {
  changeCurrentTabPanel,
  sagaSaveTempTestInfoToLocal,
  toggleAnswerCard,
  togglePaperHasDoneFlag,
  sagaSubmitPaper,
} from '../../../../models/actions'
import CommonTitle from '../../../../components/Appbar/CommonTitle'
import { TransitionProps } from '@material-ui/core/transitions'

const useStyles = makeStyles(theme => ({
  btnSubmit: {
    borderRadius: 0,
    color: '#fff',
    height: '100%',
  },
  linkIconItem: {
    width: '20%',
    padding: theme.spacing(1, 0),

    [theme.breakpoints.up('md')]: {
      width: '10%',
    },
  },
  linkIcon: {
    display: 'block',
    width: 24,
    height: 24,
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.primary,
    border: `2px solid ${theme.palette.text.primary}`,
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '20px',
    margin: '0 auto',
    cursor: 'pointer',
    backgroundColor: 'transparent',

    '&.multi': {
      borderRadius: '20%',
    },

    '&.done': {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },

    '&.active': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AnswerCard(): JSX.Element {
  const {
    showAnswerCard,
    questionLinksData,
    handleChangeQuestionPanel,
    handleCloseAnswerCard,
    handleSubmitPaper,
    disableBtnSubmit,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useAnswerCardHook()
  const classes = useStyles()

  const renderQuestionLinks = (
    <Box clone paddingY={2}>
      <Grid container>
        {questionLinksData.map(item => (
          <Grid item key={item.index} className={classes.linkIconItem}>
            <Box
              component="button"
              onClick={(): void => handleChangeQuestionPanel(item.index)}
              className={`${classes.linkIcon} ${
                item.questionType === Type.MULTI ? 'multi' : ''
              } ${item.hasDone ? 'done' : ''} ${
                item.index === item.value ? 'active' : ''
              }`}
            >
              {item.index + 1}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )

  return (
    <>
      {/* AnswerCard Fullscreen Dialog */}
      <Dialog
        className={'answerCardDialog'}
        fullScreen
        open={showAnswerCard}
        onClose={handleCloseAnswerCard}
        TransitionComponent={Transition}
      >
        <AppBar position="relative">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseAnswerCard}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <CommonTitle>
              <FormattedMessage
                id="test.testPage.AnswerCard.title"
                defaultMessage="答题卡"
              />
            </CommonTitle>
          </Toolbar>
        </AppBar>
        <BodyLayout>
          {/* question links */}
          {renderQuestionLinks}
        </BodyLayout>
        {/* submitPaper button */}
        <Box
          className={'submitPaperBtnWrapper'}
          position="absolute"
          width="100%"
          height={'45px'}
          bottom={0}
          left={0}
          bgcolor="primary.main"
        >
          <Button
            fullWidth
            className={classes.btnSubmit}
            autoFocus
            disabled={disableBtnSubmit}
            onClick={handleSubmitPaper}
          >
            <FormattedMessage
              id="test.testPage.AnswerCard.btnSubmitPaper"
              defaultMessage="提交并查看结果"
            />
          </Button>
        </Box>
      </Dialog>
    </>
  )
}

export function useAnswerCardHook(): AnswerCardHookReturnType {
  const dispatch = useDispatch()
  const {
    showAnswerCard,
    paperData,
    currentTabPanelIndex,
    userAnswers,
  } = useSelector(({ testPageState }) => testPageState)

  const questionLinksData: QuestionLinkItemProps[] = []

  if (paperData) {
    for (let i = 0; i < paperData.questionAmount; i++) {
      const targetUserAnswerItem = userAnswers.find(
        item => item.questionId === paperData.questions[i].id
      )
      const hasDone =
        (targetUserAnswerItem && targetUserAnswerItem.answer.length > 0) ||
        false
      questionLinksData.push({
        index: i,
        value: currentTabPanelIndex,
        hasDone,
        questionType: paperData.questions[i].type,
      })
    }
  }

  // 是否禁用 提交试卷 按钮
  const disableBtnSubmit = !paperData

  /**
   * 隐藏答题卡
   */
  const handleCloseAnswerCard = React.useCallback(() => {
    dispatch(toggleAnswerCard())
  }, [dispatch])

  /**
   * 更改当前 question panel
   */
  const handleChangeQuestionPanel = React.useCallback(
    (index: number) => {
      // 隐藏答题卡
      handleCloseAnswerCard()

      // 切换 panel
      dispatch(changeCurrentTabPanel(index))

      // 备份考试临时信息到本地
      dispatch(sagaSaveTempTestInfoToLocal())

      // 页面滚动到顶部
      window.scrollTo(0, 0)
    },
    [dispatch, handleCloseAnswerCard]
  )

  /**
   * 提交试卷
   */
  const handleSubmitPaper = (): void => {
    if (paperData) {
      // 设置试卷为 已完成 状态
      dispatch(togglePaperHasDoneFlag(true))

      // 隐藏答题卡
      handleCloseAnswerCard()

      // 发送异步请求
      dispatch(sagaSubmitPaper())
    }
  }

  return {
    showAnswerCard,
    questionLinksData,
    handleChangeQuestionPanel,
    handleCloseAnswerCard,
    handleSubmitPaper,
    disableBtnSubmit,
  }
}

export interface AnswerCardHookReturnType {
  showAnswerCard: boolean
  questionLinksData: QuestionLinkItemProps[]
  handleCloseAnswerCard: () => void
  handleChangeQuestionPanel: (index: number) => void
  handleSubmitPaper: () => void
  disableBtnSubmit: boolean
}

export interface QuestionLinkItemProps {
  index: number
  value: number
  hasDone: boolean
  questionType: Type
}
