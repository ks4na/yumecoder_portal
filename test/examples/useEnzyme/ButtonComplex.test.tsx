import React from 'react'
import { shallow } from 'enzyme'
import { renderHook, act } from '@testing-library/react-hooks'
import Button from './ButtonComplex'
import mockedUseButtonHook from './useButtonHook'

jest.mock('./useButtonHook', () => {
  return jest
    .fn()
    .mockName('mockedUseButtonHook')
    .mockReturnValue({
      isDisabled: true,
      handleClick: jest.fn(),
    })
})

describe('test Button()', () => {
  test('should render Button correctly', async () => {
    const onClickMockFn = jest.fn()
    const wrapper = shallow(<Button onClick={onClickMockFn}>Hello</Button>)
    expect(wrapper).toMatchInlineSnapshot(`
      <button
        disabled={true}
        onClick={[MockFunction]}
      >
        Hello
      </button>
    `)
    expect(mockedUseButtonHook).toHaveBeenCalledTimes(1)
    expect(mockedUseButtonHook).toHaveBeenLastCalledWith(onClickMockFn)
    ;(mockedUseButtonHook as jest.MockedFunction<typeof mockedUseButtonHook>)
      .mockReset()
      .mockReturnValue({
        isDisabled: false,
        handleClick: jest.fn(),
      })
    const wrapper2 = shallow(<Button onClick={onClickMockFn}>Hello</Button>)
    expect(wrapper2).toMatchInlineSnapshot(`
      <button
        disabled={false}
        onClick={[MockFunction]}
      >
        Hello
      </button>
    `)
    expect(mockedUseButtonHook).toHaveBeenCalledTimes(1)
    expect(mockedUseButtonHook).toHaveBeenLastCalledWith(onClickMockFn)
  })
})

describe('test useButtonHook()', () => {
  let useButtonHook: typeof mockedUseButtonHook
  beforeEach(() => {
    useButtonHook = jest.requireActual('./useButtonHook').default
  })

  test('return value with or without initialOnClick param', () => {
    // without initialOnClick param
    const { result } = renderHook(() => useButtonHook())
    expect(result.current).toEqual({
      isDisabled: false,
      handleClick: expect.any(Function),
    })

    // with initialOnClick param
    const onClickMockFn = jest.fn()
    const { result: result2 } = renderHook(() => useButtonHook(onClickMockFn))

    expect(result2.current).toEqual({
      isDisabled: false,
      handleClick: expect.any(Function),
    })
  })

  test('should call initialOnClick when handleClick is called', () => {
    const onClickMockFn = jest.fn()
    const { result } = renderHook(() => useButtonHook(onClickMockFn))
    expect(onClickMockFn).not.toBeCalled()
    const eventObj = {} as React.MouseEvent<HTMLButtonElement, MouseEvent>

    act(() => {
      result.current.handleClick(eventObj)
    })

    expect(onClickMockFn).toHaveBeenCalledTimes(1)
    expect(onClickMockFn).toHaveBeenLastCalledWith(eventObj)
  })

  test('isDisabled should be true when handleClick is called , and be false in 2 seconds', () => {
    jest.useFakeTimers()
    const { result } = renderHook(() => useButtonHook())
    expect(result.current.isDisabled).toBe(false)

    act(() => {
      result.current.handleClick({} as React.MouseEvent<
        HTMLButtonElement,
        MouseEvent
      >)
    })
    expect(result.current.isDisabled).toBe(true)
    act(() => {
      jest.advanceTimersByTime(1999)
    })
    expect(result.current.isDisabled).toBe(true)
    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current.isDisabled).toBe(false)
  })

  test('recompute "handleClick" only when "initialOnClick" changes', () => {
    // should not recompute "handleClick" when "initialOnClick" doesn't change
    const { result, rerender } = renderHook(
      ({
        initialOnClick,
      }: {
        initialOnClick: (
          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => void
      }) => useButtonHook(initialOnClick),
      {
        initialProps: { initialOnClick: jest.fn() },
      }
    )
    const handleClick = result.current.handleClick

    rerender()
    expect(result.current.handleClick).toBe(handleClick)

    // should recompute "handleClick" when "initialOnClick" changes
    rerender({ initialOnClick: jest.fn() })
    expect(result.current.handleClick).not.toBe(handleClick)
  })
})
export {}
