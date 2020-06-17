import React from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Box,
} from '@material-ui/core'
import { OptionType } from '../../../../models/reducers/tests/testPage'

const useStyles = makeStyles(theme => ({
  optionIconWrapper: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 'auto',
    },
  },
  optionIcon: {
    width: 22,
    height: 22,
    margin: theme.spacing(0, 2, 0, 0),
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.text.primary,
    border: `2px solid ${theme.palette.text.primary}`,
    borderRadius: (props: { optionIconType: 'radio' | 'checkbox' }): string =>
      props.optionIconType === 'checkbox' ? '20%' : '50%',
    textAlign: 'center',
    lineHeight: '18px',

    '&.selected': {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
  },
  optionContent: {
    wordBreak: 'break-all',

    '&.selected': {
      color: theme.palette.primary.main,
    },
  },
}))

export interface OptionsProps {
  options: OptionType[]
  optionIconType: 'radio' | 'checkbox'
  handleItemClick: (answer: string) => void
  selectedItems: number[]
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
  handleItemClick,
  selectedItems,
}: OptionsProps): JSX.Element {
  const classes = useStyles({ optionIconType })

  const sortedOptions = options.sort((a, b) => a.sort - b.sort)

  const renderOptionIcon = function(
    content: string,
    isSelected = false
  ): JSX.Element {
    return (
      <Box className={`${classes.optionIcon}${isSelected ? ' selected' : ''}`}>
        {content}
      </Box>
    )
  }

  return (
    <List className={'option-wrapper'}>
      {sortedOptions.map((item, index) => {
        // 是否选中该选项
        const isSelected = selectedItems.includes(index)

        return (
          <ListItem
            key={index}
            button
            disableGutters
            onClick={(): void => handleItemClick(mapIndexToLetter(index))}
          >
            <ListItemIcon className={classes.optionIconWrapper}>
              {renderOptionIcon(mapIndexToLetter(index), isSelected)}
            </ListItemIcon>
            <ListItemText
              className={`${classes.optionContent}${
                isSelected ? ' selected' : ''
              }`}
              primaryTypographyProps={{ variant: 'body2' }}
              primary={item.content}
            />
          </ListItem>
        )
      })}
    </List>
  )
}
