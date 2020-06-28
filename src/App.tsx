import React from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom'
import './App.scss'
import GlobalSnackbar from './containers/GlobalSnackbar'
import IndexPage from './containers/IndexPage'
// import DevIndexPage from './components/demos/DevIndexPage'
import NoMatch from './components/NoMatch'
import LoginPage from './containers/LoginPage'
import GithubLoginCallback from './containers/LoginPage/GithubLoginCallback'
import QQLoginCallback from './containers/LoginPage/QQLoginCallback'
import RegistPage from './containers/RegistPage'
import PasswordIndex from './containers/Password'
import useScrollToTop from './components/hooks/useScrollToTop'
import TestIndex from './containers/Test'
import HomeIndex from './containers/Home'

const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: IndexPage,
  },
  // {
  //   path: '/dev',
  //   component: DevIndexPage,
  // },
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
    path: '/password',
    component: PasswordIndex,
  },
  {
    path: '/test',
    component: TestIndex,
  },
  {
    path: '/home',
    component: HomeIndex,
  },
  {
    path: '*',
    component: NoMatch,
  },
]

export default function App(): JSX.Element {
  // 路由切换时，返回页面顶部
  useScrollToTop()

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
