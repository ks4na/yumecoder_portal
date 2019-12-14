import React from 'react'
import Demos from '../../containers/demos/index.jsx'
import TestMuiDemo from './TestMaterialDesign.jsx'
import { useRouteMatch, NavLink, Switch, Route } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout.jsx'
import NoMatch from '../NoMatch.jsx'
import styles from './DevIndexPage.scss'

export default function DevIndexPage() {
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
