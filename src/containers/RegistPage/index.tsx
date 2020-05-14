import React from 'react'
import { Switch, Route, RouteProps, useRouteMatch } from 'react-router-dom'
import NoMatch from '../../components/NoMatch'
import RegistForm from './RegistForm'
import BasicLayout from '../../components/layouts/BasicLayout'
import BodyLayout from '../../components/layouts/BodyLayout'
import Header from './Header'
import RegistActiveForm from './ActiveForm'
import { LinearProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'

const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: RegistForm,
  },
  {
    path: '/active',
    exact: true,
    component: RegistActiveForm,
  },
  {
    path: '*',
    component: NoMatch,
  },
]

export default function Index(): JSX.Element {
  const match = useRouteMatch()
  const showProgressbar = useSelector(
    ({ registState }) => registState.showProgressbar
  )
  return (
    <BasicLayout>
      {/* Header */}
      <Header />
      {/* regist progress bar */}
      {showProgressbar && <LinearProgress color="secondary" />}
      {/* Body */}
      <BodyLayout>
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} {...route} path={`${match.path}${route.path}`} />
          ))}
        </Switch>
      </BodyLayout>
    </BasicLayout>
  )
}
