import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'

export function Routes () {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
    </Switch>
  )
}
