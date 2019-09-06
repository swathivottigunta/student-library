import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './pages/home';
import Add from './pages/add';
import Edit from './pages/edit';
import ChangeStatus from './pages/change-status';


class App extends React.Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/add' component={Add} />
          <Route path='/edit/:id' component={Edit} />
          <Route path='/change-status' component={ChangeStatus} />
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;

