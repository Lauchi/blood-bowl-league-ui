import React, {FunctionComponent} from 'react';
import {connect} from "react-redux";

import {Box, Typography} from "@material-ui/core";
import {LoadingIndicator} from "../UtilComponents/LoadingIndicator";
import {useTranslation} from 'react-i18next';
import BuyPlayerPanel from "./BuyPlayerPanel";
import PlayerListForTeam from "./PlayerListForTeam";
import {CombinedStates} from "../CombinedStates";
import {FullTeam} from "../Models/Teams/FullTeam";
import {Race} from "../Models/Races/Race";

const TeamManagementPage:FunctionComponent<{
    loading: boolean
    team: FullTeam
    races: Race[]
}> = ({ loading, team, races }) => {
    const { t } = useTranslation();

    if (loading || !team) return <LoadingIndicator />;

    const fullTeam = team.team;
    const teamMoney = fullTeam.teamChest.value;

    return (
        <Box mt={3}>
            <Typography variant='h4'>{fullTeam.teamName} ({t("races." + fullTeam.raceId)})</Typography>

            <PlayerListForTeam playerList={team.playerList}/>
            <BuyPlayerPanel team={team} races={races}/>
            <Box pt={3}>
                <Typography variant='h5'>{teamMoney} G</Typography>
            </Box>
        </Box>
    )
};

function mapStateToProps(state: CombinedStates) {
    const { team, loading, races } = state.teamState;
    return {
        team,
        loading,
        races
    }
}

export default connect(mapStateToProps)(TeamManagementPage)