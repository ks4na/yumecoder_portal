import React from 'react'
import { shallow } from 'enzyme'
import Button from './ButtonSimple'

describe('test Button()', () => {
  test('should render correctly', () => {
    const wrapper = shallow(<Button onClick={jest.fn()}>Hello</Button>)

    expect(wrapper).toMatchInlineSnapshot(`
      <button
        disabled={false}
        onClick={[Function]}
      >
        Hello
      </button>
    `)
  })

  test('should call "onClick" callback when button is clicked', () => {
    const onClickMockFn = jest.fn()
    const wrapper = shallow(<Button onClick={onClickMockFn}>Hello</Button>)

    expect(onClickMockFn).not.toBeCalled()
    wrapper.find('button').simulate('click')
    expect(onClickMockFn).toHaveBeenCalledTimes(1)
  })

  test('should be throttled to 2s when button is clicked', () => {
    jest.useFakeTimers()
    const wrapper = shallow(<Button>Hello</Button>)
    wrapper.find('button').simulate('click')
    expect(wrapper.find('button').prop('disabled')).toBe(true)
    jest.advanceTimersByTime(1999)
    expect(wrapper.find('button').prop('disabled')).toBe(true)
    jest.advanceTimersByTime(1)
    expect(wrapper.find('button').prop('disabled')).toBe(false)
  })
})

export {}
