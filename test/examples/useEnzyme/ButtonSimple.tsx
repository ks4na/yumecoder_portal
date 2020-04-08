import React from 'react'
// import useButtonHook from './useButtonHook'

/**
 * 一个 Button， 点击后调用指定的回调函数，并且2秒内禁用
 */

interface UseButtonHookReturnType {
  isDisabled: boolean
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export function useButtonHook(
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

interface ButtonPropTypes {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
}

export default function Button({
  onClick,
  children,
}: ButtonPropTypes): JSX.Element {
  const { isDisabled, handleClick } = useButtonHook(onClick)

  return (
    <button onClick={handleClick} disabled={isDisabled}>
      {children}
    </button>
  )
}
