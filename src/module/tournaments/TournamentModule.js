import React from "react";
import {TournamentHeader} from '../../component/tournaments/TournamentHeader.jsx';

const AboutTournament = (props) => {
    return (
        <div>
            <TournamentHeader/>
            <h2>Hello World Tournament</h2>
        </div>
    );
};

AboutTournament.propTypes = {
};

export default AboutTournament;