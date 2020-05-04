import React from "react";
// import Log from 'react-log';
import {Logger} from './component/utils/Logger.jsx'
//import {TournamentHeader} from './component/tournaments/TournamentHeader.jsx';

import TournamentModule from "./module/tournaments/TournamentModule";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Users = () => {
  return (
    <div>
        <Logger
          msg='Logueando ando'
        />
        <h2>Hello World 2</h2>
    </div>
); 
}

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tournaments">Tournaments</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <a href="/rosterImport.html">Roster Import</a>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/tournaments">
            <TournamentModule 
              title='XDD'
            />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}