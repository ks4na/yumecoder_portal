import React from 'react'
import { useLocation, Redirect } from 'react-router-dom'

export default function Page404(): JSX.Element {
  const location = useLocation()
  return (
    <Redirect
      to={{
        pathname: '/404',
        state: { referrer: location.pathname },
      }}
    />
  )
}
