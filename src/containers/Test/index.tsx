import React from 'react'
import { Switch, RouteProps, Route, useRouteMatch } from 'react-router-dom'
import TestMenuPage from './TestMenu'
import NoMatch from '../../components/NoMatch'

const routes: RouteProps[] = [
  {
    path: '/menu',
    exact: true,
    component: TestMenuPage,
  },
  {
    path: '*',
    component: NoMatch,
  },
]

export default function Index(): JSX.Element {
  const match = useRouteMatch()

  return (
    <Switch>
      {routes.map(({ path, ...otherProps }, i) => {
        return <Route key={i} path={`${match.path}${path}`} {...otherProps} />
      })}
    </Switch>
  )
}
