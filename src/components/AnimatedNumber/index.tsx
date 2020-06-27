import React from 'react'
import { animated, useSpring } from 'react-spring'

export interface AnimatedNumberProps {
  to: number
  from?: number
  decimalPlaces?: number
  interpolateFn?: (val: number) => unknown
}

export default function AnimatedNumber({
  to,
  from = 0,
  decimalPlaces = 0,
  interpolateFn,
}: AnimatedNumberProps): JSX.Element {
  const props = useSpring({ value: to, from: { value: from } })

  return (
    <animated.span>
      {props.value.interpolate(
        interpolateFn || ((val): string => val.toFixed(decimalPlaces))
      )}
    </animated.span>
  )
}
