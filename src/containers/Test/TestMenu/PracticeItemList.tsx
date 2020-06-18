import React from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  IconButton,
  makeStyles,
  Tooltip,
} from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

export default function PracticeItemList({
  list,
  toTestPage,
}: PracticeItemListProps): JSX.Element {
  return (
    <Box clone flex={1}>
      <List dense disablePadding>
        {list.map(item => {
          return (
            <ListItem key={item.id} divider>
              <ListItemText
                primary={item.name}
                secondary={
                  <PracticeItemSummary
                    totalAmount={item.totalAmount}
                    doneAmount={item.doneAmount}
                    rightAmount={item.rightAmount}
                  />
                }
              />
              <ListItemSecondaryAction>
                <Tooltip
                  placement="left"
                  title={
                    <FormattedMessage
                      id="test.testMenu.practiceItemList.tooltipToPractice"
                      defaultMessage="去练习"
                    />
                  }
                >
                  <IconButton
                    color="primary"
                    aria-label="take a practice"
                    edge="end"
                    onClick={(): void => toTestPage(item.id)}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export interface PracticeItemListProps {
  list: PracticeItem[]
  toTestPage: (categoryId: number) => void
}

export interface PracticeItem {
  id: number
  name: string
  totalAmount: number
  doneAmount: number
  rightAmount: number
}

// PracticeItemSummary
export interface PracticeItemSummaryProps {
  totalAmount: number
  doneAmount: number
  rightAmount: number
}

const usePracticeItemSummaryStyles = makeStyles({
  listItemTextSecondary: {
    fontSize: 12,
  },
})

export function PracticeItemSummary({
  totalAmount,
  doneAmount,
  rightAmount,
}: PracticeItemSummaryProps): JSX.Element {
  const classes = usePracticeItemSummaryStyles()

  return (
    <Typography
      variant="body2"
      component="span"
      className={classes.listItemTextSecondary}
    >
      <FormattedMessage
        id="test.testMenu.practiceItemList.txtTotalAmount"
        values={{ totalAmount }}
        defaultMessage="共 { totalAmount } 题"
      />
      {' | '}
      <FormattedMessage
        id="test.testMenu.practiceItemList.txtDoneAmount"
        values={{ doneAmount }}
        defaultMessage="已做 { doneAmount } 题"
      />
      {' | '}
      <FormattedMessage
        id="test.testMenu.practiceItemList.txtCorrectRate"
        values={{
          rate:
            doneAmount === 0 ? 0 : Math.round((rightAmount / doneAmount) * 100),
        }}
        defaultMessage="正确率 { rate } %"
      />
    </Typography>
  )
}
