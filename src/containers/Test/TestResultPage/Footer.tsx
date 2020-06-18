import React from 'react'
import { Grid, Button, makeStyles, Divider, Icon } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: theme.mixins.testPageFooterHeight,
    backgroundColor: theme.palette.primary.main,
  },

  divider: {
    backgroundColor: theme.palette.background.default,
  },

  button: {
    height: '100%',
    borderRadius: 0,
    color: '#fff',

    '& .btnIcon': {
      fontSize: theme.typography.pxToRem(18),

      '&:before': {
        color: 'inherit',
      },
    },
  },
}))

export default function Footer(): JSX.Element {
  const classes = useStyles()

  const {
    disableBtnClick,
    handleBtnAnalysisOfWrongClick,
    handleBtnAnalysisOfAllClick,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useFooterHook()

  return (
    <Grid container className={classes.footer}>
      <Grid item xs>
        <Button
          fullWidth
          className={classes.button}
          startIcon={<Icon className={`fa-analysis-wrong btnIcon`} />}
          disabled={disableBtnClick}
          onClick={handleBtnAnalysisOfWrongClick}
        >
          <FormattedMessage
            id="test.testResultPage.footer.btnAnalysisOfWrong"
            defaultMessage="错题解析"
          />
        </Button>
      </Grid>
      <Divider orientation="vertical" flexItem className={classes.divider} />
      <Grid item xs>
        <Button
          fullWidth
          className={classes.button}
          startIcon={<Icon className={`fa-analysis-all btnIcon`} />}
          disabled={disableBtnClick}
          onClick={handleBtnAnalysisOfAllClick}
        >
          <FormattedMessage
            id="test.testResultPage.footer.btnAnalysisOfAll"
            defaultMessage="全部解析"
          />
        </Button>
      </Grid>
    </Grid>
  )
}

export function useFooterHook(): FooterHookReturnType {
  const history = useHistory()
  const { data } = useSelector(({ testResultState }) => testResultState)

  const disableBtnClick = !data

  const handleBtnAnalysisOfWrongClick = React.useCallback(() => {
    if (data) {
      history.push(`/test/${data.id}/analysis?onlyMistake=true`)
    }
  }, [data, history])

  const handleBtnAnalysisOfAllClick = React.useCallback(() => {
    if (data) {
      history.push(`/test/${data.id}/analysis`)
    }
  }, [data, history])

  return {
    disableBtnClick,
    handleBtnAnalysisOfWrongClick,
    handleBtnAnalysisOfAllClick,
  }
}

export interface FooterHookReturnType {
  disableBtnClick: boolean
  handleBtnAnalysisOfWrongClick: () => void
  handleBtnAnalysisOfAllClick: () => void
}
