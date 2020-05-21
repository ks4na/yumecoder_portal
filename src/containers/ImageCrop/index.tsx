import React from 'react'
import ReactCrop, { ReactCropProps, Crop, PercentCrop } from 'react-image-crop'
import 'react-image-crop/lib/ReactCrop.scss'
import { makeStyles } from '@material-ui/core'
import ImageCropPlaceholder from './ImageCropPlaceholder'
import { useDispatch } from 'react-redux'
import { addSnackbarItem } from '../../models/actions'
import { useIntl } from 'react-intl'

// 上传的图片支持的格式
export const SUPPORT_TYPE = {
  jpeg: 'image/jpeg,image/jpg',
  png: 'image/png',
}
// 上传的图片的大小， 单位 MB
export const MAX_FILE_SIZE = 1
// crop 选区的最小尺寸
const MIN_CROP_SIZE = 50

const useStyles = makeStyles(theme => ({
  avatarUpload: {
    '&.avatarUploadUpSm': {
      [theme.breakpoints.up('sm')]: {
        width: theme.breakpoints.values.sm,
        margin: '0 auto',
        display: 'block',
      },
    },
  },
}))

export interface ImageCropProps extends ReactCropProps {
  handleFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ImageCrop({
  handleFileSelected,
  src,
  crop,
  onChange,
  onImageLoaded,
  ...otherProps
}: ImageCropProps): JSX.Element {
  const classes = useStyles()

  const reactCropProps: ReactCropProps = {
    src,
    crop,
    onChange,
    onImageLoaded,
    keepSelection: true,
    circularCrop: true,
    minWidth: MIN_CROP_SIZE,
    minHeight: MIN_CROP_SIZE,
    ...otherProps,
  }

  return (
    <>
      {!src ? (
        <ImageCropPlaceholder
          handleFileSelected={handleFileSelected}
          supportFileTypes={SUPPORT_TYPE}
          maxFileSize={MAX_FILE_SIZE}
        />
      ) : (
        <ReactCrop
          {...reactCropProps}
          className={`${classes.avatarUpload} avatarUploadUpSm`}
        />
      )}
    </>
  )
}

export function useImageCropHook(): ImageCropHookReturnType {
  const dispatch = useDispatch()
  const intl = useIntl()

  const imgRef = React.useRef<HTMLImageElement | null>(null)
  const [src, setSrc] = React.useState<string>('')
  const [crop, setCrop] = React.useState<PercentCrop>()

  const handleFileSelected = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (e.target.files && e.target.files.length > 0) {
        const img = e.target.files[0]
        // 校验文件类型和尺寸
        const supportFileTypes = Object.values(SUPPORT_TYPE)
          .join(',')
          .split(',')
        if (!supportFileTypes.includes(img.type)) {
          const txtUnsupportedFileType = intl.formatMessage({
            id: 'imageCrop.txtUnsupportedFileType',
            defaultMessage: '不支持的图片格式',
          })
          dispatch(addSnackbarItem({ message: txtUnsupportedFileType }))
          return
        }
        if (img.size > MAX_FILE_SIZE * 1024 * 1024) {
          const txtFileSizeTooLarge = intl.formatMessage({
            id: 'imageCrop.txtFileSizeTooLarge',
            defaultMessage: '图片大小超过限制',
          })
          dispatch(addSnackbarItem({ message: txtFileSizeTooLarge }))
          return
        }

        const reader = new FileReader()
        reader.addEventListener('load', () => {
          setSrc(reader.result as string)
        })
        reader.readAsDataURL(img)
      }
    },
    [dispatch, intl]
  )

  const onImageLoaded = React.useCallback((img: HTMLImageElement) => {
    imgRef.current = img
    // 设置选区边长为较短的边
    const aspect = 1 / 1
    const width =
      img.width < img.height ? 100 : ((img.height * aspect) / img.width) * 100
    const height =
      img.height < img.width ? 100 : (img.width / aspect / img.height) * 100
    const y = (100 - height) / 2
    const x = (100 - width) / 2
    setCrop(prevCrop => ({
      ...prevCrop,
      unit: '%',
      aspect,
      width,
      height,
      x,
      y,
    }))
    return false
  }, [])

  const onChange = React.useCallback(
    (crop: Crop, percentCrop: PercentCrop): void => {
      setCrop(percentCrop)
    },
    []
  )

  const resetImageCropState = React.useCallback(() => {
    setSrc('')
    imgRef.current = null
    setCrop(undefined)
  }, [])

  return {
    imgRef,
    src,
    crop,
    handleFileSelected,
    onImageLoaded,
    onChange,
    resetImageCropState,
  }
}

export interface ImageCropHookReturnType {
  imgRef: React.MutableRefObject<HTMLImageElement | null>
  src: string
  crop?: PercentCrop
  handleFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void
  onImageLoaded: (img: HTMLImageElement) => void
  onChange: (crop: Crop, percentCrop: PercentCrop) => void
  resetImageCropState: () => void
}
