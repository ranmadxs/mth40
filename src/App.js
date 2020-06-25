import React from "react";
import {MainIframe} from './component/utils/MainIframe';
import SearchGlobalContainer from './containers/search/SearchGlobalContainer';
import MenuContainer from './containers/menu/MenuContainer'
import RosterContainer from './containers/roster/RosterContainer';
import SearchListContainer from './containers/search/SearchListContainer';
import TournamentContainer from "./containers/tournament/TournamentContainer";
import MatchScoreContainer from './containers/tournament/MatchScoreContainer';
import HomeContainer from './containers/home/HomeContainer';

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
        <SearchGlobalContainer/>
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
          <Route  path="/tournament/tmatch/:tournamentId/:matchId" render={(props) => 
            <MatchScoreContainer {...props} />} >
          </Route>
          <Route path="/" onEnter={onAppInit(store.dispatch)}>
            <HomeContainer
              version={version}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;