import React from 'react'
import { Switch, Route, RouteProps, useRouteMatch } from 'react-router-dom'

import Root from './HomeRoot'
import Profile from './Profile'
import Settings from './Settings'
import NoMatch from '../../components/NoMatch'

const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: Root,
  },
  {
    path: '/settings',
    exact: true,
    component: Settings,
  },
  {
    path: '/profile',
    exact: true,
    component: Profile,
  },
  {
    path: '*',
    component: NoMatch,
  },
]

export default function HomeIndex(): JSX.Element {
  const match = useRouteMatch()

  return (
    <Switch>
      {routes.map((route, i) => {
        return <Route key={i} {...route} path={`${match.path}${route.path}`} />
      })}
    </Switch>
  )
}
