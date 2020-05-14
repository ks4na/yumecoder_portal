import React from 'react'
import { Switch, Route, RouteProps, useRouteMatch } from 'react-router-dom'
import NoMatch from '../../components/NoMatch'
import PasswordResetIndex from './PwdResetPage'

const routes: RouteProps[] = [
  {
    path: '/reset',
    component: PasswordResetIndex,
  },
  { path: '*', component: NoMatch },
]

export default function Index(): JSX.Element {
  const match = useRouteMatch()
  return (
    <Switch>
      {routes.map((route, i) => {
        return <Route key={i} {...route} path={`${match.path}${route.path}`} />
      })}
    </Switch>
  )
}
