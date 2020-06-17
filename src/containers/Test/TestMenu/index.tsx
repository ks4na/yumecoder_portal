import React from 'react'
import BasicLayout from '../../../components/layouts/BasicLayout'
import BodyLayout from '../../../components/layouts/BodyLayout'
import Header from './Header'
import PracticeInfo from './PracticeInfo'
import PracticePanel from './PracticePanel'
import NavDrawer from './NavDrawer'
import { useDispatch, useSelector } from 'react-redux'
import { Status } from '../../../models/reducers/status'
import {
  sagaFetchTestMenuData,
  sagaCancelFetchTestMenuData,
  resetTestMenuState,
} from '../../../models/actions'
import TempTestInfoCheck from './TempTestInfoCheck'

export default function TestMenu(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { isOpen, handleNavDrawerToggle } = useNavDrawerOpenStateHook()

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  useTestMenuDataHook()

  return (
    <>
      <BasicLayout>
        {/* Header */}
        <Header handleNavDrawerToggle={handleNavDrawerToggle} />
        {/* Nav */}
        <NavDrawer
          open={isOpen}
          handleNavDrawerToggle={handleNavDrawerToggle}
        />
        {/* Body */}
        <BodyLayout disableGutters>
          <PracticeInfo />
          <PracticePanel />
        </BodyLayout>
      </BasicLayout>

      {/* 检测是否存在临时考试信息 */}
      <TempTestInfoCheck />
    </>
  )
}

// useNavDrawerOpenStateHook
export function useNavDrawerOpenStateHook(): NavDrawerOpenStateHookReturnType {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const handleNavDrawerToggle = React.useCallback((): void => {
    setIsOpen(prevState => !prevState)
  }, [])

  return {
    isOpen,
    handleNavDrawerToggle,
  }
}

export interface NavDrawerOpenStateHookReturnType {
  isOpen: boolean
  handleNavDrawerToggle: () => void
}

// useTestMenuDataHook
export function useTestMenuDataHook(): void {
  const statusRef = React.useRef<Status>(Status.INITIAL)
  const dispatch = useDispatch()
  const status = useSelector(({ testMenuState }) => testMenuState.status)
  statusRef.current = status

  React.useEffect(() => {
    // didmount
    // 发送请求获取 testMenu 数据
    dispatch(sagaFetchTestMenuData())

    return (): void => {
      // 如果 status 为 请求中，则先取消
      if (statusRef.current === Status.PROGRESSING) {
        dispatch(sagaCancelFetchTestMenuData())
      }
      // 重置 testMenuState
      dispatch(resetTestMenuState())
    }
  }, [dispatch])
}
