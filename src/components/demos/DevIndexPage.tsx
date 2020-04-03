import React from 'react'
import Demos from '../../containers/demos/index'
import TestMuiDemo from './TestMaterialDesign'
import { useRouteMatch, NavLink, Switch, Route } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import NoMatch from '../NoMatch'
import styles from './DevIndexPage.scss'

export default function DevIndexPage(): JSX.Element {
  const match = useRouteMatch()
  return (
    <RootLayout>
      <div className={styles.navLinkWrapper}>
        <ul>
          <li>
            <NavLink to={`${match.url}/testMui`}>Test Material Design</NavLink>
          </li>
          <li>
            <NavLink to={`${match.url}/demos`}>Demos Page</NavLink>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path={`${match.path}/demos`}>
          <Demos />
        </Route>
        <Route path={`${match.path}/testMui`}>
          <TestMuiDemo />
        </Route>
        <Route path={`${match.path}/*`}>
          <NoMatch />
        </Route>
      </Switch>
    </RootLayout>
  )
}
