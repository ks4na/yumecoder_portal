import React from 'react'
import styles from './App.scss'
import CssBaseline from '@material-ui/core/CssBaseline'
import { NavLink, Switch, Route } from 'react-router-dom'
import Demos from './containers/demos/index.jsx'
import TestMuiDemo from './components/TestMaterialDesign.jsx'

export default function App() {
  return (
    <>
      <CssBaseline />

      <div className={styles.navLinkWrapper}>
        <ul>
          <li>
            <NavLink to="/testMui">Test Material Design</NavLink>
          </li>
          <li>
            <NavLink to="/demos">Demos Page</NavLink>
          </li>
        </ul>
      </div>

      <Switch>
        <Route path="/demos" component={Demos} />
        <Route path="/testMui" component={TestMuiDemo} />
      </Switch>
    </>
  )
}
