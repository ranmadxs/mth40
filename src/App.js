import React from "react";
import MainHeader from './component/header/MainHeader';
import {MainIframe} from './component/utils/MainIframe';
import {Logger} from './component/utils/Logger.jsx';
import TournamentModule from "./module/tournaments/TournamentModule";
import SearchAll from './containers/search/SearchGlobalContainer';
import SearchListContainer from './containers/search/SearchListContainer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
var pjson = require('../package.json');

const Rosters = () => {
  return (
    <div>
        <Logger msg='Logueando ando' />
        <h2>Hello World 2 [rosters]</h2>
    </div>
); 
}

const App = () => {
  const { version } = pjson;
  return (    
    <Router>
      <div>
        <SearchAll/>
        <MainHeader/>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/tournaments">
            <TournamentModule 
              title='XDD'
            />
          </Route>
          <Route path="/rosterImport">
            <MainIframe />
          </Route>          
          <Route path="/rosters">
            <Rosters />
          </Route>
          <Route path="/favorites">
            <div>Hola Favorites</div>
          </Route>          
          <Route path="/">
            <Home 
              version={version}
            />
          </Route>          
        </Switch>
      </div>
    </Router>
  );
}

function Home({version}) {
  return (
    <div>
      <SearchListContainer/>
      <h2>Home V {version}</h2>
      <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="/tournaments">Tournaments</a>
          </li>
          <li>
            <a href="/rosters">Rosters</a>
          </li>
          <li>
            <a href="/rosterImport">Roster Import</a>
          </li>            
        </ul>      
    </div>
  );
}

export default App;