import React from 'react'
import { Switch, Route } from 'react-router-dom'
import IndexPage from './containers/IndexPage'
import DevIndexPage from './components/demos/DevIndexPage'
import NoMatch from './components/NoMatch'
import './App.scss'

export default function App(): JSX.Element {
  return (
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
  )
}
