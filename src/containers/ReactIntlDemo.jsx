import React from 'react'
import ReactIntlDemo from '../components/ReactIntlDemo.jsx'
import { changeLocale } from '../models/actions/locale.js'
import { useDispatch } from 'react-redux'

function WrappedReactIntlDemo() {
  const dispatch = useDispatch()

  const reactIntlDemoProps = {
    title: '这是一段标题',
    createTime: new Date(),
    content: '这里是一段内容...',
    changeLocale(locale) {
      dispatch(changeLocale(locale))
    }
  }

  return (
    <>
      <ReactIntlDemo {...reactIntlDemoProps} />
    </>
  )
}

export default WrappedReactIntlDemo
