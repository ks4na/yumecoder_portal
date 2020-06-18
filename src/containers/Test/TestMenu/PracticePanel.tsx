import React from 'react'
import {
  Box,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PracticeItemList, { PracticeItem } from './PracticeItemList'
import { useSelector } from 'react-redux'
import { CategoryItem } from '../../../models/reducers/tests/menu'
import { Status } from '../../../models/reducers/status'
import { Skeleton } from '@material-ui/lab'
import usePreparePaperHook from '../../../components/hooks/usePreparePaperHook'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles(theme => ({
  panelDetails: {
    paddingRight: 0,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}))

export default function PracticePanel(): JSX.Element {
  const classes = useStyles()
  const { data, status } = useSelector(({ testMenuState }) => testMenuState)
  const categories = (data && data.categories) || []
  const isLoading = status === Status.PROGRESSING

  const {
    expanded,
    autoExpandFirstPanel,
    changeExpandState,
    setExpandPanel,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = usePracticePanelHook(categories)

  const { isPreparing, handleRequestPreparePaper } = usePreparePaperHook()

  if (isLoading) {
    return (
      <>
        <Box margin={2}>
          <Skeleton variant="rect" height={30} />
          <Box margin={2} marginRight={0}>
            <Skeleton variant="rect" height={30} />
          </Box>
          <Box margin={2} marginRight={0}>
            <Skeleton variant="rect" height={30} />
          </Box>
        </Box>
        <Box margin={2}>
          <Skeleton variant="rect" height={30} />
        </Box>
        <Box margin={2}>
          <Skeleton variant="rect" height={30} />
        </Box>
      </>
    )
  }

  return (
    <>
      <Box marginBottom={2}>
        {categories.map((menu, i) => {
          const menuPanelName = `panel-${menu.id}-${menu.categoryName}`
          // 设置第一个 panel 为默认展开的 panel
          if (i === 0 && autoExpandFirstPanel) {
            setExpandPanel(menuPanelName)
          }

          const practiceItemList =
            (menu.children &&
              menu.children.map(
                (item): PracticeItem => ({
                  id: item.id,
                  name: item.categoryName,
                  totalAmount: item.questionAmount,
                  doneAmount: item.userDoneAmount || 0,
                  rightAmount: item.userRightAmount || 0,
                })
              )) ||
            []
          return (
            <ExpansionPanel
              key={menu.id}
              square
              expanded={expanded === menuPanelName}
              onChange={changeExpandState(
                expanded === menuPanelName ? false : menuPanelName
              )}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${menuPanelName}bh-content`}
              >
                <Typography>{menu.categoryName}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.panelDetails}>
                <PracticeItemList
                  list={practiceItemList}
                  toTestPage={handleRequestPreparePaper}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })}
      </Box>
      {/* preparePaper status */}
      <Backdrop open={isPreparing} className={classes.backdrop}>
        <Box textAlign="center" color="common.white">
          <Box marginBottom={4}>
            <CircularProgress color="inherit" />
          </Box>
          <Typography>
            <FormattedMessage
              id="test.testMenu.practicePanel.txtPreparingPaper"
              defaultMessage="正在准备试卷中..."
            />
          </Typography>
        </Box>
      </Backdrop>
    </>
  )
}

export function usePracticePanelHook(
  categories: CategoryItem[]
): PracticePanelHookReturnType {
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const [autoExpandFirstPanel, setAutoExpandFirstPanel] = React.useState<
    boolean
  >(true)

  const changeExpandState = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (expandState: string | false) => (e: React.ChangeEvent<{}>): void => {
      setAutoExpandFirstPanel(false)
      setExpanded(expandState)
    },
    []
  )

  const setExpandPanel = React.useCallback((panelName: string): void => {
    setAutoExpandFirstPanel(false)
    setExpanded(panelName)
  }, [])

  React.useEffect((): void => {
    setAutoExpandFirstPanel(true)
  }, [categories])

  return {
    expanded,
    autoExpandFirstPanel,
    changeExpandState,
    setExpandPanel,
  }
}

export interface PracticePanelHookReturnType {
  expanded: string | false
  autoExpandFirstPanel: boolean
  changeExpandState: (
    expandState: string | false
  ) => (e: React.ChangeEvent<{}>) => void
  setExpandPanel: (panelName: string) => void
}
