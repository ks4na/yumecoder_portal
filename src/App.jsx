import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Switch, Route } from 'react-router-dom'
import DevIndexPage from './components/demos/DevIndexPage.jsx'
import NoMatch from './components/NoMatch.jsx'
import Page404 from './components/Page404.jsx'
import IndexPage from './containers/IndexPage.jsx'

import RootLayout from './components/layouts/RootLayout.jsx'

export default function App() {
  return (
    <RootLayout>
      <CssBaseline />

      <Switch>
        <Route path="/" exact>
          <IndexPage />
        </Route>
        <Route path="/404">
          <Page404 />
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
