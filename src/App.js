import React from "react";
import {MainIframe} from './component/utils/MainIframe';
import SearchAll from './containers/search/SearchGlobalContainer';
import MenuContainer from './containers/menu/MenuContainer'
import RosterContainer from './containers/roster/RosterContainer';
import SearchListContainer from './containers/search/SearchListContainer';
import TournamentContainer from "./containers/tournament/TournamentContainer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
var pjson = require('../package.json');

function onAppInit(dispatch) {
  console.log("appInit");
}

const App = ({store}) => {
  const { version } = pjson;
  return (    
    <Router>
      <div>
        <SearchAll/>
        <MenuContainer/>
        {/*<MainHeader/>*/}
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/tournaments" component={TournamentContainer} />
          <Route path="/rosterImport">
            <MainIframe />
          </Route>          
          <Route path="/rosters" component={RosterContainer} />
          <Route path="/favorites">
            <div>Hola Favorites</div>
          </Route>          
          <Route path="/" onEnter={onAppInit(store.dispatch)}>
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
            <a href="/">Home</a>
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