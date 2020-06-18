import React from 'react'
import { makeStyles, Grid, Box, IconButton } from '@material-ui/core'
import teal from '@material-ui/core/colors/teal'
import red from '@material-ui/core/colors/red'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  questionViewShortcuts: {
    marginBottom: theme.spacing(2),
  },
  linkIconWrapper: {
    width: '20%',
    textAlign: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),

    [theme.breakpoints.up('md')]: {
      width: '10%',
    },
  },
  linkIconBtn: {
    width: 26,
    height: 26,
    lineHeight: '26px',
    borderRadius: '50%',
    fontSize: theme.typography.pxToRem(16),
    color: '#fff',

    '&.right': {
      backgroundColor: teal[400],
    },

    '&.wrong': {
      backgroundColor: red[600],
    },
  },
}))

export default function QuestionViewShortcuts(): JSX.Element {
  const classes = useStyles()

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { linkItems, handleItemClick } = useQuestionViewShortcutsHook()

  return (
    <Box clone className={classes.questionViewShortcuts}>
      <Grid container>
        {linkItems.map((item, index) => {
          return (
            <Grid key={index} item className={classes.linkIconWrapper}>
              <IconButton
                onClick={(): void => handleItemClick(index)}
                className={`${classes.linkIconBtn} ${
                  item.isRight ? 'right' : 'wrong'
                }`}
              >
                {index + 1}
              </IconButton>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export function useQuestionViewShortcutsHook(): QuestionViewShortcutsHookReturnType {
  const history = useHistory()
  const { data } = useSelector(({ testResultState }) => testResultState)

  const handleItemClick = React.useCallback(
    (tabIndex: number) => {
      if (data) {
        history.push(`/test/${data.id}/analysis?tabIndex=${tabIndex}`)
      }
    },
    [data, history]
  )

  return {
    linkItems: (data && data.questions) || [],
    handleItemClick,
  }
}

export interface QuestionViewShortcutsHookReturnType {
  linkItems: { id: number; isRight: boolean }[]
  handleItemClick: (tabIndex: number) => void
}
