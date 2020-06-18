import React from 'react'
import {
  Grid,
  Button,
  Box,
  makeStyles,
  Divider,
  BoxProps,
} from '@material-ui/core'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles(theme => ({
  buttonNoRadius: {
    borderRadius: 0,
    color: '#fff',
    height: '100%',
  },
  divider: {
    backgroundColor: theme.palette.background.default,
  },
}))

export interface BottomOperationButtonsProps extends BoxProps {
  onToPreviousBtnClick: () => void
  onToNextbtnClick: () => void
  onSubmitBtnClick: () => void
  disableBtnToPrevious: boolean
  disableBtnToNext: boolean
  displaySubmitBtn: boolean
}

export default function BottomOperationButtons({
  onToPreviousBtnClick,
  onToNextbtnClick,
  onSubmitBtnClick,
  disableBtnToPrevious,
  disableBtnToNext,
  displaySubmitBtn,
  ...otherProps
}: BottomOperationButtonsProps): JSX.Element {
  const classes = useStyles()

  return (
    <Box
      clone
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      height={otherProps.height || 45}
      bgcolor="primary.main"
      {...otherProps}
    >
      <Grid container>
        <Grid item xs>
          <Button
            fullWidth
            className={classes.buttonNoRadius}
            disabled={disableBtnToPrevious}
            onClick={onToPreviousBtnClick}
          >
            <FormattedMessage
              id="test.testPage.BottomOperationButton.btnToPrevious"
              defaultMessage="上一题"
            />
          </Button>
        </Grid>
        <Divider orientation="vertical" flexItem className={classes.divider} />
        <Grid item xs>
          {displaySubmitBtn ? (
            <Button
              fullWidth
              className={classes.buttonNoRadius}
              onClick={onSubmitBtnClick}
            >
              <FormattedMessage
                id="test.testPage.BottomOperationButton.btnSubmitPaper"
                defaultMessage="提交答案"
              />
            </Button>
          ) : (
            <Button
              fullWidth
              className={classes.buttonNoRadius}
              disabled={disableBtnToNext}
              onClick={onToNextbtnClick}
            >
              <FormattedMessage
                id="test.testPage.BottomOperationButton.btnToNext"
                defaultMessage="下一题"
              />
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
