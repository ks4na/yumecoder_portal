import React, { useState } from 'react'
import CompOne from '../../components/demos/CompOne'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'

export default function LazyLoadDemo(): JSX.Element {
  const [compTwo, setCompTwo] = useState<React.ReactNode>()
  const handleClick = async (): Promise<void> => {
    try {
      const CompTwo = await (await import(
        /* webpackChunkName: 'CompTwo' */ '../../components/demos/CompTwo'
      )).default
      setCompTwo(CompTwo)
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
