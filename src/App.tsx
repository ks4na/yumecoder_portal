import React from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom'
import './App.scss'
import GlobalSnackbar from './containers/GlobalSnackbar'
import IndexPage from './containers/IndexPage'
import DevIndexPage from './components/demos/DevIndexPage'
import NoMatch from './components/NoMatch'
import LoginPage from './containers/LoginPage'
import GithubLoginCallback from './containers/LoginPage/GithubLoginCallback'
import QQLoginCallback from './containers/LoginPage/QQLoginCallback'
import RegistPage from './containers/RegistPage'

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
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/githubLoginCallback',
    component: GithubLoginCallback,
  },
  {
    path: '/qqLoginCallback',
    component: QQLoginCallback,
  },
  {
    path: '/regist',
    component: RegistPage,
  },
  {
    path: '*',
    component: NoMatch,
  },
]

export default function App(): JSX.Element {
  return (
    <>
      {/* 全局消息提示组件 */}
      <GlobalSnackbar />
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Switch>
    </>
  )
}
