import React from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
  ListItemProps,
  Paper,
  Box,
  Typography,
} from '@material-ui/core'
import RightIcon from '@material-ui/icons/ChevronRight'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  listItemIcon: {
    minWidth: theme.spacing(5),
    color: theme.palette.primary.main,
  },
  rightIcon: {
    color: theme.palette.grey[500],
  },
}))

export interface ShortcutListItem extends ListItemProps<'div'> {
  name: React.ReactNode
  icon: React.ReactNode
  component?: React.ElementType
  to?: string
  count?: number
}

export interface ShortcutListProps {
  list: ShortcutListItem[]
}

export default function ShortcutList({ list }: ShortcutListProps): JSX.Element {
  const classes = useStyles()

  return (
    <Box clone marginBottom={2}>
      <Paper square>
        <List aria-label="shortcut list" disablePadding>
          {list.map((item, i) => {
            const { name, icon, count, ...others } = item
            return (
              <ListItem
                key={i}
                {...others}
                button
                component={item.component || Link}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={name} />
                <ListItemSecondaryAction>
                  <Box display="flex" marginRight={-1}>
                    {count !== undefined && (
                      <Typography component="span" color="primary">
                        {count}
                      </Typography>
                    )}
                    <RightIcon className={classes.rightIcon} />
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
      </Paper>
    </Box>
  )
}
