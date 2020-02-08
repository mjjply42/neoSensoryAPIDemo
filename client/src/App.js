import React, {useEffect, useState} from 'react';
import { Route, Link, useRouteMatch, useParams, Switch } from 'react-router-dom'
import { useDispatch, useSelector, Provider } from 'react-redux'
import { Users } from './components/Users.js'
import { Profile } from './components/Profile.js'
import './App.css';
import store from "./store";

function App() {

  return (
    <Provider store={store}>
    <div className="App">
      <header className="App-header">
        <Route path='/' exact component={Users}/>
        <Route path='/profiles/:uuid' exact component={Profile}/>
      </header>
    </div>
    </Provider>
  );
}

export default App;
