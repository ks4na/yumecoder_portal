import React from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom'
import './App.scss'
import IndexPage from './containers/IndexPage'
import DevIndexPage from './components/demos/DevIndexPage'
import NoMatch from './components/NoMatch'

const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: IndexPage,
  },
  {
    path: '/dev',
    component: DevIndexPage,
  },
  {
    path: '*',
    component: NoMatch,
  },
]

export default function App(): JSX.Element {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} {...route} />
      ))}
    </Switch>
  )
}
