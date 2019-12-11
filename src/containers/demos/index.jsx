import React from 'react'
import { Link, Switch, useRouteMatch, Route } from 'react-router-dom'
// import { RouteWithSubRoutes } from '../../router.js'
import LazyLoadDemo from './LazyLoadDemo.jsx'
import TaskListDemo from './TaskListDemo.jsx'
import ReactIntlDemo from './ReactIntlDemo.jsx'

export default function Demos() {
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
        <Route path={`${match.path}/lazyload`} component={LazyLoadDemo} />
        <Route path={`${match.path}/reduxsaga`} component={TaskListDemo} />
        <Route path={`${match.path}/reactintl`} component={ReactIntlDemo} />
      </Switch>
    </>
  )
}
