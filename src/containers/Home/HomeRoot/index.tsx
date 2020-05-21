import React from 'react'
import Header from './Header'
import BodyLayout from '../../../components/layouts/BodyLayout'
import UserInfoPreview, { UserInfoPreviewProps } from './UserInfoPreview'
import ShortcutList, { ShortcutListItem } from './ShortcutList'
import { FormattedMessage } from 'react-intl'
import { Icon } from '@material-ui/core'
import useUserInfoHook from '../../../components/hooks/useUserInfo'
import { useSelector, useDispatch } from 'react-redux'
import { Status } from '../../../models/reducers/status'
import {
  sagaFetchShortcutListCount,
  sagaCancelFetchShortcutListCount,
  resetShortcutListCountState,
} from '../../../models/actions'
import { ShortcutListCountData } from '../../../models/reducers/home/shortcutListCount'

export default function HomeRoot(): JSX.Element {
  const { isLoading, userInfo } = useUserInfoHook()

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { shortcutListCount } = useShortcutListCountHook()

  const testHistoryCount: number =
    (shortcutListCount && shortcutListCount.history.count) || 0

  const mistakesCount: number =
    (shortcutListCount && shortcutListCount.mistakes.count) || 0
  const collectionCount: number =
    (shortcutListCount && shortcutListCount.collection.count) || 0

  const userInfoPreviewProps: UserInfoPreviewProps = {
    isLoading,
    nickname: (userInfo && userInfo.nickname) || '',
    avatar: (userInfo && userInfo.avatar) || '',
    personalSignature: (userInfo && userInfo.personalSignature) || '',
    follows: (userInfo && userInfo.follows) || 0,
    followers: (userInfo && userInfo.followers) || 0,
  }

  const shortcutList: ShortcutListItem[] = [
    {
      name: (
        <FormattedMessage
          id="home.homeRoot.txtNavTestHistory"
          defaultMessage="历史练习"
        />
      ),
      icon: <Icon className="fa-my-practice" />,
      to: '/test/history',
      count: testHistoryCount,
    },
    {
      name: (
        <FormattedMessage
          id="home.homeRoot.txtNavMistakes"
          defaultMessage="错题集"
        />
      ),
      icon: <Icon className="fa-mistakes" />,
      to: '/question/mistakes',
      count: mistakesCount,
    },
    {
      name: (
        <FormattedMessage
          id="home.homeRoot.txtNavCollection"
          defaultMessage="收藏的题目"
        />
      ),
      icon: <Icon className="fa-collection" />,
      to: '/question/collection',
      count: collectionCount,
    },
  ]

  const settingsList: ShortcutListItem[] = [
    {
      name: (
        <FormattedMessage
          id="home.homeRoot.txtNavSettings"
          defaultMessage="设置"
        />
      ),
      icon: <Icon className="fa-settings" />,
      to: '/home/settings',
    },
  ]

  return (
    <>
      {/* Header */}
      <Header />
      {/* BodyLayout */}
      <BodyLayout disableGutters>
        {/* UserInfoPreview */}
        <UserInfoPreview {...userInfoPreviewProps} />
        {/* ShortcutList */}
        <ShortcutList list={shortcutList} />
        {/* Settings */}
        <ShortcutList list={settingsList} />
      </BodyLayout>
    </>
  )
}

// useShortcutListCountHook
export function useShortcutListCountHook(): ShortcutListCountHookReturnType {
  const dispatch = useDispatch()
  const currentStatusRef = React.useRef<Status>(Status.INITIAL)
  const { status, data: shortcutListCount } = useSelector(
    ({ shortcutListCountState }) => shortcutListCountState
  )
  currentStatusRef.current = status

  React.useEffect(() => {
    // didMount
    // 请求获取 shortcutListCount 数据
    dispatch(sagaFetchShortcutListCount())

    // unmount
    return (): void => {
      // 如果当前请求状态为 请求中， 则先取消
      if (currentStatusRef.current === Status.PROGRESSING) {
        dispatch(sagaCancelFetchShortcutListCount())
      }
      // 重置 shortcutListCountState
      dispatch(resetShortcutListCountState())
    }
  }, [dispatch])

  return {
    shortcutListCount,
  }
}

export interface ShortcutListCountHookReturnType {
  shortcutListCount?: ShortcutListCountData
}
