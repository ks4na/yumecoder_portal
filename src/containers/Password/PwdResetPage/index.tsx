import React from 'react'
import { Switch, Route, RouteProps, useRouteMatch } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import NoMatch from '../../../components/NoMatch'
import BasicLayout from '../../../components/layouts/BasicLayout'
import BodyLayout from '../../../components/layouts/BodyLayout'
import Header from './Header'
import EmailValidateForm from './EmailValidateForm'
import PwdResetForm from './PwdResetForm'
import { useSelector } from 'react-redux'

const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: EmailValidateForm,
  },
  {
    path: '/:email',
    component: PwdResetForm,
  },
  {
    path: '*',
    component: NoMatch,
  },
]

export default function Index(): JSX.Element {
  const match = useRouteMatch()
  const showProgressbar = useSelector(
    ({ pwdResetState }) => pwdResetState.showProgressbar
  )

  return (
    <BasicLayout>
      {/* Header */}
      <Header />
      {/* Progressbar */}
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
