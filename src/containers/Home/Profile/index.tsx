import React from 'react'
import Header from './Header'
import BodyLayout from '../../../components/layouts/BodyLayout'
import { Box, Paper, List } from '@material-ui/core'
import useUserInfoHook from '../../../components/hooks/useUserInfo'
import AvatarItem, { AvatarItemProps } from './UserInfoListItems/AvatarItem'
import NicknameItem, {
  NicknameItemProps,
} from './UserInfoListItems/NicknameItem'
import GenderItem, { GenderItemProps } from './UserInfoListItems/GenderItem'
import PersonalSignatureItem, {
  PersonalSignatureItemProps,
} from './UserInfoListItems/PersonalSignatureItem'

export default function Profile(): JSX.Element {
  const { isLoading, userInfo } = useUserInfoHook()

  const avatarItemProps: AvatarItemProps = {
    isLoading,
    avatar: userInfo && userInfo.avatar,
  }
  const nicknameItemProps: NicknameItemProps = {
    isLoading,
    nickname: userInfo && userInfo.nickname,
  }

  const genderItemProps: GenderItemProps = {
    isLoading,
    gender: userInfo && userInfo.gender,
  }

  const personalSignatureItemProps: PersonalSignatureItemProps = {
    isLoading,
    personalSignature: userInfo && userInfo.personalSignature,
  }

  return (
    <>
      {/* Header */}
      <Header />
      {/* BodyLayout */}
      <BodyLayout disableGutters>
        {/* UserInfoList */}
        <Box clone marginBottom={2}>
          <Paper square>
            <List aria-label="user info list">
              {/* avatar */}
              <AvatarItem {...avatarItemProps} />
              {/* nickname */}
              <NicknameItem {...nicknameItemProps} />
              {/* gender */}
              <GenderItem {...genderItemProps} />
              {/* personal signature */}
              <PersonalSignatureItem {...personalSignatureItemProps} />
            </List>
          </Paper>
        </Box>
      </BodyLayout>
    </>
  )
}
