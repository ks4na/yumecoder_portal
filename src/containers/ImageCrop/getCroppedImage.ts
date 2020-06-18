import { PercentCrop } from 'react-image-crop'

/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} percentCrop - PercentCrop Object
 */
export default function getCroppedImg(
  image: HTMLImageElement,
  percentCrop: PercentCrop
): string {
  const canvas = document.createElement('canvas')
  canvas.width = ((percentCrop.width || 0) / 100) * image.width
  canvas.height = ((percentCrop.height || 0) / 100) * image.height
  const ctx = canvas.getContext('2d')

  ctx &&
    ctx.drawImage(
      image,
      ((percentCrop.x || 0) / 100) * image.naturalWidth,
      ((percentCrop.y || 0) / 100) * image.naturalHeight,
      ((percentCrop.width || 0) / 100) * image.naturalWidth,
      ((percentCrop.height || 0) / 100) * image.naturalHeight,
      0,
      0,
      ((percentCrop.width || 0) / 100) * image.width,
      ((percentCrop.height || 0) / 100) * image.height
    )

  // As Base64 string
  const base64Image = canvas.toDataURL('image/jpeg')
  return base64Image
}
