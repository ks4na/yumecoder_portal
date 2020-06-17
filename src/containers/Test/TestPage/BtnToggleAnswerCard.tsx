import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import DescriptionIcon from '@material-ui/icons/Description'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { toggleAnswerCard } from '../../../models/actions'

export interface BtnToggleAnswerCardProps {
  smallSize?: boolean
}

export default function BtnToggleAnswerCard({
  smallSize = false,
}: BtnToggleAnswerCardProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { disableClick, handleToggleAnswerCard } = useAnswerCardHook()

  return (
    <Tooltip
      title={
        <FormattedMessage
          id="test.testPage.btnToggleAnswerCard"
          defaultMessage="答题卡"
        />
      }
      arrow
      placement="bottom"
    >
      <IconButton
        color="inherit"
        onClick={disableClick ? undefined : handleToggleAnswerCard}
      >
        <DescriptionIcon fontSize={smallSize ? 'small' : 'default'} />
      </IconButton>
    </Tooltip>
  )
}

export function useAnswerCardHook(): AnswerCardHookReturnType {
  const dispatch = useDispatch()
  const { paperData } = useSelector(({ testPageState }) => testPageState)

  // 是否允许点击事件
  const disableClick = !paperData

  // 显示/隐藏 答题卡
  const handleToggleAnswerCard = React.useCallback(() => {
    dispatch(toggleAnswerCard())
  }, [dispatch])

  return {
    disableClick,
    handleToggleAnswerCard,
  }
}

export interface AnswerCardHookReturnType {
  disableClick: boolean
  handleToggleAnswerCard: () => void
}
