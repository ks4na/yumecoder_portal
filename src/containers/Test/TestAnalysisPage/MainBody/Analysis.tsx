import React from 'react'
import { Box, Button, Typography, makeStyles, Slide } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles(theme => ({
  analysisHeader: {
    fontWeight: theme.typography.fontWeightBold,
  },
}))

export interface AnalysisProps {
  content: string
}

export default function Analysis({ content }: AnalysisProps): JSX.Element {
  const classes = useStyles()

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { showContent, handleShowContent } = useAnalysisHook()

  return (
    <Box className={'analysis-wrapper'} marginY={2}>
      {!showContent ? (
        <Button fullWidth variant="contained" onClick={handleShowContent}>
          <FormattedMessage
            id="test.testAnalysisPage.mainBody.btnShowAnalysis"
            defaultMessage="查 看 解 析"
          />
        </Button>
      ) : (
        <Slide direction="up" in={showContent} mountOnEnter unmountOnExit>
          <Box>
            <Typography
              component="h3"
              gutterBottom
              className={classes.analysisHeader}
            >
              <FormattedMessage
                id="test.testAnalysisPage.mainBody.txtAnalysisTitle"
                defaultMessage="题目解析"
              />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {content}
            </Typography>
          </Box>
        </Slide>
      )}
    </Box>
  )
}

export function useAnalysisHook(): AnalysisHookReturnType {
  const [showContent, setShowContent] = React.useState<boolean>(false)

  const handleShowContent = React.useCallback(() => {
    setShowContent(true)
  }, [])

  return {
    showContent,
    handleShowContent,
  }
}

export interface AnalysisHookReturnType {
  showContent: boolean
  handleShowContent: () => void
}
