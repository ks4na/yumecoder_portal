import React from 'react'
import useTestInfoHook from './useTestInfoHook'
import { useRouteMatch } from 'react-router-dom'
import BasicLayout from '../../../components/layouts/BasicLayout'
import BodyLayout from '../../../components/layouts/BodyLayout'
import Header, { HeaderProps } from './Header'
import ExitHalfwayHandler from './ExitHalfwayHandler'
import QuestionPanels from './QuestionPanels'
import AnswerCard from './AnswerCard'
import RetryPaperSubmitDialog from './RetryPaperSubmitDialog'
import PaperHasDoneDialog, {
  PaperHasDoneDialogProps,
} from './PaperHasDoneDialog'
import PaperSubmissionBackdrop from './PaperSubmissionBackdrop'
import RetrySaveTempTestInfoDialog from './RetrySaveTempTestInfoDialog'

export default function TestPage(): JSX.Element {
  const match = useRouteMatch<{ testId: string }>()
  const { testId } = match.params

  const { isFetchingPaper, paperData } = useTestInfoHook(testId)

  // header Props
  const headerProps: HeaderProps = {
    title: paperData && paperData.testName,
    isLoading: isFetchingPaper,
  }

  // paperHasDoneDialog props
  const paperHasDoneDialogProps: PaperHasDoneDialogProps = {
    testId,
  }

  return (
    <>
      {/* 处理考试中途退出的情况 */}
      <ExitHalfwayHandler />
      {/* 主体部分的布局容器 */}
      <BasicLayout>
        {/* Header */}
        <Header {...headerProps} />
        {/* Body */}
        <BodyLayout disableGutters>
          <QuestionPanels />
        </BodyLayout>
      </BasicLayout>
      {/* 答题卡 */}
      <AnswerCard />
      {/* 试卷已完成提示 dialog */}
      <PaperHasDoneDialog {...paperHasDoneDialogProps} />
      {/* 试卷正在提交中 Backdrop */}
      <PaperSubmissionBackdrop />
      {/* 重试试卷提交 dialog */}
      <RetryPaperSubmitDialog />
      {/* 重试保存未完成的试卷信息 dialog */}
      <RetrySaveTempTestInfoDialog />
    </>
  )
}
