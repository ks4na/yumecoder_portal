import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Switch, Route } from 'react-router-dom'
import IndexPage from './containers/IndexPage'
import DevIndexPage from './components/demos/DevIndexPage'
import NoMatch from './components/NoMatch'
import './App.scss'

import RootLayout from './components/layouts/RootLayout'

export default function App(): JSX.Element {
  return (
    <RootLayout>
      <CssBaseline />

      <Switch>
        <Route path="/" exact>
          <IndexPage />
        </Route>
        <Route path="/dev">
          <DevIndexPage />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </RootLayout>
  )
}
