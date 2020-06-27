import React from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Box,
} from '@material-ui/core'
import { AnalysisDataOption } from '../../../../models/reducers/tests/testAnalysis'
import red from '@material-ui/core/colors/red'
import teal from '@material-ui/core/colors/teal'

const useStyles = makeStyles(theme => ({
  optionWrapper: {
    marginBottom: theme.spacing(1),
  },
  optionIconWrapper: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 'auto',
    },
  },
  optionIcon: {
    width: 22,
    height: 22,
    margin: theme.spacing(0, 2, 0, 1),
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.text.primary,
    border: `2px solid ${theme.palette.text.primary}`,
    borderRadius: (props: { optionIconType: 'radio' | 'checkbox' }): string =>
      props.optionIconType === 'checkbox' ? '20%' : '50%',
    textAlign: 'center',
    lineHeight: '18px',

    '&.right': {
      backgroundColor: teal[400],
      color: '#fff',
      border: 'none',
      lineHeight: 'inherit',
    },

    '&.wrong': {
      backgroundColor: red[600],
      color: '#fff',
      border: 'none',
      lineHeight: 'inherit',
    },

    '&.halfRight': {
      color: '#fff',
      border: 'none',
      lineHeight: 'inherit',
      position: 'relative',
      backgroundColor: teal[400],

      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '50%',
        height: '100%',
        backgroundColor: red[600],
        borderRadius: '20% 0 0 20%',
      },
      '&:after': {
        content: 'attr(data-value)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
    },
  },
  optionContent: {
    wordBreak: 'break-all',
  },
}))

export interface OptionsProps {
  options: AnalysisDataOption[]
  optionIconType: 'radio' | 'checkbox'
  userSelectedOptions: number[]
  rightOptions: number[]
}

/**
 * 数字索引映射为从 A 开始的字母
 * @param num 从 0 开始的数字
 */
const mapIndexToLetter = function(num: number): string {
  return String.fromCharCode(num + 65)
}

export default function Options({
  options,
  optionIconType,
  userSelectedOptions,
  rightOptions,
}: OptionsProps): JSX.Element {
  const classes = useStyles({ optionIconType })

  return (
    <List className={classes.optionWrapper}>
      {options.map((item, index) => {
        // 用户是否选中该选项
        const isUserSelected = userSelectedOptions.includes(index)
        // 是否是正确的选项
        const isRightOption = rightOptions.includes(index)
        // 用户是否选中了所有的正确选项
        const hasSelectedAllRightOptions =
          userSelectedOptions.length === rightOptions.length &&
          new Set([...userSelectedOptions, ...rightOptions]).size ===
            rightOptions.length

        // 生成对应的类名
        let className = ''
        if (hasSelectedAllRightOptions) {
          if (isRightOption) {
            className = 'right'
          }
        } else {
          if (isRightOption) {
            if (isUserSelected) {
              className = 'halfRight'
            } else {
              className = 'right'
            }
          } else {
            if (isUserSelected) {
              className = 'wrong'
            }
          }
        }

        return (
          <ListItem key={index} disableGutters>
            <ListItemIcon className={classes.optionIconWrapper}>
              <Box
                className={`${classes.optionIcon} ${className}`}
                data-value={mapIndexToLetter(index)}
              >
                {mapIndexToLetter(index)}
              </Box>
            </ListItemIcon>
            <ListItemText
              className={`${classes.optionContent}`}
              primaryTypographyProps={{ variant: 'body2' }}
              primary={item.content}
            />
          </ListItem>
        )
      })}
    </List>
  )
}
