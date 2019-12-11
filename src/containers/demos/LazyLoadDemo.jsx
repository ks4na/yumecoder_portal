import React, { useState } from 'react'
import CompOne from '../../components/demos/CompOne.jsx'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'

export default function LazyLoadDemo() {
  const [compTwo, setCompTwo] = useState()
  const handleClick = async () => {
    try {
      const CompTwo = await import(
        /* webpackChunkName: 'CompTwo' */ '../../components/demos/CompTwo.jsx'
      )
      setCompTwo(CompTwo.default)
    } catch (err) {
      console.log('异步组件加载失败')
    }
  }

  return (
    <>
      <Button
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={handleClick}
      >
        加载异步组件
      </Button>
      <CompOne />
      {compTwo}
    </>
  )
}
