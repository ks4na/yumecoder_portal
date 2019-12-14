import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Page404() {
  const location = useLocation()
  return (
    <>
      <h2>404 page</h2>
      <p>
        no page matches the url :{' '}
        <strong>{location.state && location.state.referrer}</strong>
      </p>
    </>
  )
}
