import React from 'react'
import { Menu, MenuItem, MenuProps } from '@material-ui/core'
import { LocaleKey } from '../../locales'
import { useSelector, useDispatch } from 'react-redux'
import { sagaChangeLocale } from '../../models/actions'

const DEFAULT_MENU_ID = 'language-choose-menu'

export interface LanguageChooseMenuProps extends Partial<MenuProps> {
  changeAnchorEl: (
    anchorEl: null | Element | ((element: Element) => Element)
  ) => void
}

export default function LanguageChooseMenu({
  anchorEl,
  changeAnchorEl,
  ...otherProps
}: LanguageChooseMenuProps): JSX.Element {
  const {
    options,
    selectedIndex,
    handleMenuClose,
    handleMenuItemClick,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useLanguageChooseMenuHook(changeAnchorEl)
  return (
    <Menu
      id={DEFAULT_MENU_ID}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      {...otherProps}
    >
      {options.map((option, index) => (
        <MenuItem
          key={option.key}
          selected={index === selectedIndex}
          onClick={(e): void => handleMenuItemClick(e, index)}
        >
          {option.value}
        </MenuItem>
      ))}
    </Menu>
  )
}

// useLanguageChooseMenuHook
export function useLanguageChooseMenuHook(
  changeAnchorEl: (
    anchorEl: null | Element | ((element: Element) => Element)
  ) => void
): LanguageChooseMenuHookReturnType {
  const dispatch = useDispatch()
  const currentLocale = useSelector(({ localeState }) => localeState.locale)

  const options: {
    key: LocaleKey
    value: string
  }[] = [
    {
      key: 'zh-cn',
      value: '中文',
    },
    {
      key: 'en-us',
      value: 'English',
    },
  ]
  const selectedIndex = options.findIndex(item => item.key === currentLocale)

  const handleMenuClose = React.useCallback((): void => {
    changeAnchorEl(null)
  }, [changeAnchorEl])

  const handleMenuItemClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>, index: number): void => {
      changeAnchorEl(null)
      if (index === selectedIndex) {
        return
      }
      dispatch(sagaChangeLocale(options[index].key))
    },
    [changeAnchorEl, dispatch, options, selectedIndex]
  )

  return {
    options,
    selectedIndex,
    handleMenuClose,
    handleMenuItemClick,
  }
}

export interface LanguageChooseMenuHookReturnType {
  options: {
    key: LocaleKey
    value: string
  }[]
  selectedIndex: number
  handleMenuClose: () => void
  handleMenuItemClick: (e: React.MouseEvent<HTMLElement>, index: number) => void
}
