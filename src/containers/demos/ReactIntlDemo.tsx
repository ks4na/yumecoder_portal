import React from 'react'
import ReactIntlDemo from '../../components/demos/ReactIntlDemo'
import { sagaChangeLocale } from '../../models/actions/locale'
import { LocaleKey } from '../../locales'
import { useDispatch } from 'react-redux'

function WrappedReactIntlDemo(): JSX.Element {
  const dispatch = useDispatch()

  const reactIntlDemoProps = {
    title: '这是一段标题',
    createTime: new Date(),
    content: '这里是一段内容...',
    changeLocale(locale: LocaleKey): void {
      dispatch(sagaChangeLocale(locale))
    },
  }

  return (
    <>
      <ReactIntlDemo {...reactIntlDemoProps} />
    </>
  )
}

export default WrappedReactIntlDemo
