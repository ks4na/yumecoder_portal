import React from 'react'
import Header from './Header'
import BodyLayout from '../../../components/layouts/BodyLayout'
import CommonSettingsList from './CommonSettingsList'
import PersonalSettingsList, {
  PersonalSettingsListProps,
} from './PersonalSettingsList'
import useUserInfoHook from '../../../components/hooks/useUserInfo'
import BtnLogout from './BtnLogout'

export default function Settings(): JSX.Element {
  const { isLoading, userInfo } = useUserInfoHook()

  const personalSettingsListProps: PersonalSettingsListProps = {
    isLoading,
    questionsPerTest: userInfo && userInfo.questionNumberPerTime,
    testRange: userInfo && userInfo.testRange,
  }

  return (
    <>
      {/* Header */}
      <Header />
      {/* BodyLayout */}
      <BodyLayout disableGutters>
        {/* CommonSettingsList */}
        <CommonSettingsList />
        {/* PersonalSettingsList */}
        <PersonalSettingsList {...personalSettingsListProps} />
        {/* logout button */}
        <BtnLogout />
      </BodyLayout>
    </>
  )
}
