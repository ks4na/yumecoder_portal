import React from 'react'
import { Switch, Route, RouteProps, useRouteMatch } from 'react-router-dom'
import Root from './HomeRoot'
import NoMatch from '../../components/NoMatch'
import loadable from '@loadable/component'

const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: Root,
  },
  {
    path: '/settings',
    exact: true,
    component: loadable(() =>
      import(/* webpackChunkName: 'settings-page' */ './Settings')
    ),
  },
  {
    path: '/profile',
    exact: true,
    component: loadable(() =>
      import(/* webpackChunkName: 'profile-page' */ './Profile')
    ),
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
