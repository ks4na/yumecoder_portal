import React from 'react'
import { makeStyles, Hidden, Typography, Box, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles(theme => ({
  imageCropPlaceholderTxt: {
    color: theme.palette.grey[500],

    '& .addAvatarIcon': {
      fontSize: 100,
      marginBottom: theme.spacing(1),
    },
  },
}))

export interface ImageCropPlaceholderProps {
  handleFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void
  maxFileSize: number
  supportFileTypes: { [prop: string]: string }
}

export default function ImageCropPlaceholder({
  handleFileSelected,
  maxFileSize,
  supportFileTypes,
}: ImageCropPlaceholderProps): JSX.Element {
  const classes = useStyles()
  const fileUploadInputRef = React.useRef<HTMLInputElement>(null)

  const handleBoxClick = function(): void {
    fileUploadInputRef.current && fileUploadInputRef.current.click()
  }

  const acceptValue = Object.values(supportFileTypes).join(',')
  const acceptTypeNames = Object.keys(supportFileTypes).join('/')

  return (
    <>
      <Box clone minHeight={200}>
        <Grid container alignItems="center" onClick={handleBoxClick}>
          <Box clone textAlign="center" paddingX={2}>
            <Grid item xs className={classes.imageCropPlaceholderTxt}>
              <AddIcon className="addAvatarIcon" />
              <Typography>
                <FormattedMessage
                  id="imageCrop.txtPlaceholder"
                  defaultMessage="请选择 {maxFileSize} MB 以内的图片, 支持 {acceptTypeNames} 格式"
                  values={{
                    maxFileSize,
                    acceptTypeNames,
                  }}
                />
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Box>
      <Hidden implementation="css" xsUp>
        <input
          ref={fileUploadInputRef}
          type="file"
          accept={acceptValue}
          onChange={handleFileSelected}
        />
      </Hidden>
    </>
  )
}
