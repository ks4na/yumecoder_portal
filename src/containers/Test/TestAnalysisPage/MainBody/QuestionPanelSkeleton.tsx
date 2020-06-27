import React from 'react'
import {
  Box,
  makeStyles,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Grid,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import BodyLayout from '../../../../components/layouts/BodyLayout'

const useStyles = makeStyles(theme => ({
  questionPanelSkeletion: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: 'hidden',
  },
  inlineBlock: {
    display: 'inline-block',
  },
  optionIconWrapper: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 'auto',
    },
  },
  optionIcon: {
    margin: theme.spacing(0, 2, 0, 1),
  },
  chipSkeleton: {
    margin: theme.spacing(0.5),
    borderRadius: 5,
    display: 'inline-block',
  },
}))

export default function QuestionPanelSkeleton(): JSX.Element {
  const classes = useStyles()

  const renderListItem = (
    lines = 1,
    lastLineWidth?: string | number
  ): JSX.Element => {
    return (
      <ListItem disableGutters>
        <ListItemIcon className={classes.optionIconWrapper}>
          <Skeleton
            variant="circle"
            width={22}
            height={22}
            className={classes.optionIcon}
          />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ variant: 'body2' }}
          primary={
            <>
              {new Array(lines - 1).fill(0).map((item, index) => (
                <Skeleton key={index} />
              ))}
              <Skeleton width={lastLineWidth} />
            </>
          }
        />
      </ListItem>
    )
  }

  return (
    <Box className={classes.questionPanelSkeletion}>
      {/* 渲染空的 Toolbar 占位 */}
      <Toolbar />
      <BodyLayout disableGutters>
        <Box p={2}>
          {/* type  */}
          <Typography color="primary" gutterBottom>
            <Skeleton width={100} />
          </Typography>

          {/* question */}
          <Typography gutterBottom>
            <Skeleton />
            <Skeleton width={'80%'} />
          </Typography>

          {/* indicator */}
          <Typography variant="body2" align="right" gutterBottom>
            <Skeleton width={70} className={classes.inlineBlock} />
          </Typography>
          {/* options */}
          <List>
            {renderListItem(1, '80%')}
            {renderListItem(3, '20%')}
            {renderListItem(2, '80%')}
            {renderListItem()}
          </List>
          {/* answer */}
          <Box clone marginY={2}>
            <Grid container className={'answer-wrapper'}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography>
                  <Skeleton width="70%" />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography gutterBottom>
                  <Skeleton width="70%" />
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {/* knowledge tags */}
          <Box className={'knowledge-tags'} textAlign="center">
            <Box clone className={classes.chipSkeleton}>
              <Skeleton variant="rect" width={60} height={24} />
            </Box>
            <Box clone className={classes.chipSkeleton}>
              <Skeleton variant="rect" width={80} height={24} />
            </Box>
            <Box clone className={classes.chipSkeleton}>
              <Skeleton variant="rect" width={50} height={24} />
            </Box>
          </Box>
        </Box>
      </BodyLayout>
    </Box>
  )
}
