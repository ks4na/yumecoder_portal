import React from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
import IconBtnBack from '../../../components/Appbar/IconBtnBack'
import CommonTitle from '../../../components/Appbar/CommonTitle'
import { FormattedMessage } from 'react-intl'
import BtnToggleAnswerCard from './BtnToggleAnswerCard'
import TestTimer from './TestTimer'
import { Skeleton } from '@material-ui/lab'

export interface HeaderProps {
  title?: string
  isLoading?: boolean
}

export default function TestPageHeader({
  title,
  isLoading = false,
}: HeaderProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { isXsScreen } = useTestPageHeaderHook()

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconBtnBack />
          <CommonTitle smallSize={isXsScreen}>
            {isLoading ? (
              <Skeleton width="50%" />
            ) : (
              title || (
                <FormattedMessage
                  id="test.testPage.header.txtDefaultTitle"
                  defaultMessage="专项练习"
                />
              )
            )}
          </CommonTitle>
          <Box
            marginRight={isXsScreen ? -1.5 : 0}
            display="flex"
            alignItems="center"
          >
            {/* Button ShowAnswerCard */}
            <BtnToggleAnswerCard smallSize={isXsScreen} />
            {/* TestTimer */}
            <TestTimer smallSize={isXsScreen} />
          </Box>
        </Toolbar>
      </AppBar>
      {/* fix position="fixed" */}
      <Toolbar />
    </>
  )
}

export function useTestPageHeaderHook(): TestPageHeaderHookReturnType {
  const theme = useTheme()
  const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return {
    isXsScreen,
  }
}

export interface TestPageHeaderHookReturnType {
  isXsScreen: boolean
}
