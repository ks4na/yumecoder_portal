import React from 'react'

export default function useChangeLanguageHook(): ChangeLanguageHookReturnType {
  const [anchorEl, setAnchorEl] = React.useState<
    null | Element | ((element: Element) => Element)
  >()

  const changeAnchorEl = React.useCallback(
    (anchorEl: null | Element | ((element: Element) => Element)): void => {
      setAnchorEl(anchorEl)
    },
    []
  )

  const handleShowLanguageChooseMenu = React.useCallback(
    (e: React.MouseEvent<HTMLElement>): void => {
      setAnchorEl(e.currentTarget)
    },
    []
  )

  return {
    anchorEl,
    changeAnchorEl,
    handleShowLanguageChooseMenu,
  }
}

export interface ChangeLanguageHookReturnType {
  anchorEl: null | Element | ((element: Element) => Element) | undefined
  changeAnchorEl: (
    anchorEl: null | Element | ((element: Element) => Element)
  ) => void
  handleShowLanguageChooseMenu: (e: React.MouseEvent<HTMLButtonElement>) => void
}
