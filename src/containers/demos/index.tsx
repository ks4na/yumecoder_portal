import React from 'react'
import { Link, Switch, useRouteMatch, Route, Redirect } from 'react-router-dom'
import LazyLoadDemo from './LazyLoadDemo'
import TaskListDemo from './TaskListDemo'
import ReactIntlDemo from './ReactIntlDemo'

export default function Demos(): JSX.Element {
  const match = useRouteMatch()
  return (
    <>
      <h2>Demos Page</h2>

      <ul>
        <li>
          <Link to={`${match.url}/lazyload`}>
            懒加载示例：测试请求的文件名称
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/reduxsaga`}>
            redux-saga示例： 可取消的tastList
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/reactintl`}>react-intl国际化示例</Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/lazyload`}>
          <LazyLoadDemo />
        </Route>
        <Route path={`${match.path}/reduxsaga`}>
          <TaskListDemo />
        </Route>
        <Route path={`${match.path}/reactintl`}>
          <ReactIntlDemo />
        </Route>
        <Redirect to={`${match.path}`} />
      </Switch>
    </>
  )
}
