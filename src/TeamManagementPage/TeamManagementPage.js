import React from 'react';
import {connect} from "react-redux";

import {Box, Typography} from "@material-ui/core";
import {LoadingIndicator} from "../UtilComponents/LoadingIndicator";
import {useTranslation} from 'react-i18next';
import BuyPlayerPanel from "./BuyPlayerPanel";
import PlayerListForTeam from "./PlayerListForTeam";

function TeamManagementPage(props) {

    const { team, loading } = props;
    const { t } = useTranslation();

    if (loading || !team) return <LoadingIndicator />;

    const fullTeam = team.team;

    return (
        <Box mt={3}>
            <Typography variant='h4'>{fullTeam.teamName} ({t("races." + fullTeam.raceId)})</Typography>

            <PlayerListForTeam playerList={team.playerList}/>
            <BuyPlayerPanel />
        </Box>
    )
}

function mapStateToProps(state) {
    const { team, loading } = state.teamState;
    return {
        team,
        loading
    }
}

export default connect(mapStateToProps)(TeamManagementPage)