import React from 'react'
import {
  ListItem,
  ListItemText,
  Grid,
  Box,
  makeStyles,
} from '@material-ui/core'
import RightIcon from '@material-ui/icons/ChevronRight'

const useStyles = makeStyles(theme => ({
  rightIcon: {
    color: theme.palette.grey[500],
  },
}))

export interface CommonItemProps {
  divider?: boolean
  leftPart?: React.ReactNode
  rightPart?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export default function CommonItem({
  divider = true,
  leftPart,
  rightPart,
  onClick,
}: CommonItemProps): JSX.Element {
  const classes = useStyles()

  return (
    <ListItem button divider={divider} onClick={onClick}>
      <ListItemText>
        <Grid container justify="space-between">
          <Grid item>{leftPart}</Grid>
          <Box clone maxWidth="70%">
            <Grid item>
              <Box
                display="flex"
                marginRight={-1}
                alignItems="center"
                position="relative"
              >
                {rightPart}
                <RightIcon className={classes.rightIcon} />
              </Box>
            </Grid>
          </Box>
        </Grid>
      </ListItemText>
    </ListItem>
  )
}
