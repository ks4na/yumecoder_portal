import React from 'react'

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
  ListItemProps,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  listItemIcon: {
    minWidth: theme.spacing(5),
    color: theme.palette.primary.main,
  },
}))

export interface NavListItem extends ListItemProps<'div'> {
  name: React.ReactNode
  icon: React.ReactNode
  component?: React.ElementType
  href?: string
  secondaryAction?: React.ReactNode
}

export interface NavListProps {
  list: NavListItem[]
}

export default function NavList({ list }: NavListProps): JSX.Element {
  const classes = useStyles()

  return (
    <List component="nav" aria-label="menu">
      {list.map((item, i) => {
        const { name, icon, secondaryAction, ...others } = item
        return (
          <ListItem
            key={i}
            {...others}
            button
            component={item.component || 'a'}
          >
            <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
            <ListItemText primary={name} />
            {secondaryAction && (
              <ListItemSecondaryAction>
                {secondaryAction}
              </ListItemSecondaryAction>
            )}
          </ListItem>
        )
      })}
    </List>
  )
}
