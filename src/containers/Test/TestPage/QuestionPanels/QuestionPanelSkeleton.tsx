import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles({
  floatRight: {
    float: 'right',
  },
})

export default function QuestionPanelSkeleton(): JSX.Element {
  const classes = useStyles()
  const customedSkeletonHeight = '1.5rem'

  return (
    <Box p={2}>
      {/* type  */}
      <Skeleton height={customedSkeletonHeight} width={'30%'} />
      {/* question */}
      <Skeleton component="p" height={customedSkeletonHeight} />
      <Skeleton component="p" height={customedSkeletonHeight} width={'80%'} />
      {/* indicator */}
      <Box overflow="hidden">
        <Skeleton
          height={customedSkeletonHeight}
          width={'10%'}
          className={classes.floatRight}
        />
      </Box>
      {/* options */}
      <Skeleton component="p" height={customedSkeletonHeight} width={'80%'} />
      <Skeleton component="p" height={customedSkeletonHeight} width={'100%'} />
      <Skeleton component="p" height={customedSkeletonHeight} width={'60%'} />
      <Skeleton component="p" height={customedSkeletonHeight} width={'70%'} />
    </Box>
  )
}
