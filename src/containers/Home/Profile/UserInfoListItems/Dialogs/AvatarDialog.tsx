import React from 'react'
import { FormattedMessage } from 'react-intl'
import { IconButton, LinearProgress } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import BodyLayout from '../../../../../components/layouts/BodyLayout'
import useUserDataUpdateHook from '../../../../../components/hooks/useUserDataUpdateHook'
import SlideUpFullScreenDialog, {
  SlideUpFullScreenDialogProps,
} from './SlideUpFullScreenDialog'
import ImageCrop, {
  useImageCropHook,
  ImageCropProps,
} from '../../../../ImageCrop'
import getCroppedImgBase64String from '../../../../ImageCrop/getCroppedImage'
import { useDispatch } from 'react-redux'
import { addSnackbarItem } from '../../../../../models/actions'

export interface AvatarDialogProps {
  open: boolean
  handleClose: () => void
}

export default function AvatarDialog({
  open,
  handleClose: handleCloseFromParent,
}: AvatarDialogProps): JSX.Element {
  const dispatch = useDispatch()

  const {
    imgRef,
    src,
    crop,
    onChange,
    onImageLoaded,
    handleFileSelected,
    resetImageCropState,
  } = useImageCropHook()

  const { isProgressing, handleAlterAvatar } = useUserDataUpdateHook()

  const handleClose = function(): void {
    // 重置 imageCropState
    resetImageCropState()
    // 调用父组件传递的 handleClose 来关闭 dialog
    handleCloseFromParent()
  }

  const dialogTitle = (
    <FormattedMessage
      id="home.profile.dialogTitleAlterAvatar"
      defaultMessage="修改头像"
    />
  )

  const handleBtnConfirmClick = function(): void {
    if (!imgRef.current || !crop) {
      dispatch(
        addSnackbarItem({
          message: (
            <FormattedMessage
              id="home.profile.txtSelectImageFirstWarning"
              defaultMessage="请先选择图片"
            />
          ),
        })
      )
      return
    }
    // 用 successCallback 参数实现成功修改后
    // 调用回调函数 handleClose 来关闭 dailog
    const newAvatar = getCroppedImgBase64String(imgRef.current, crop)
    handleAlterAvatar(newAvatar, handleClose)
  }

  const headerRightPart = (
    <IconButton
      color="inherit"
      edge="end"
      onClick={handleBtnConfirmClick}
      disabled={isProgressing}
    >
      <DoneIcon />
    </IconButton>
  )

  const imageCropProps: ImageCropProps = {
    src,
    crop,
    onChange,
    onImageLoaded,
    handleFileSelected,
  }

  const children = (
    <>
      {isProgressing && <LinearProgress color="secondary" />}
      <BodyLayout disableGutters>
        <ImageCrop {...imageCropProps} />
      </BodyLayout>
    </>
  )

  const props: SlideUpFullScreenDialogProps = {
    open,
    handleClose,
    dialogTitle,
    headerRightPart,
    children,
  }

  return <SlideUpFullScreenDialog {...props} />
}
