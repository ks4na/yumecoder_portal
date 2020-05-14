import React from 'react'

export interface UseButtonHookReturnType {
  isDisabled: boolean
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function useButtonHook(
  onClickCallback?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
): UseButtonHookReturnType {
  const [isDisabled, setIsDisabled] = React.useState(false)
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setIsDisabled(true)

      onClickCallback && onClickCallback(e)

      setTimeout(() => setIsDisabled(false), 2000)
    },
    [onClickCallback]
  )
  return {
    isDisabled,
    handleClick,
  }
}
