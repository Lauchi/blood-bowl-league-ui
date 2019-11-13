import React, {useState} from 'react';
import {connect, useDispatch} from "react-redux";

import {Box, Typography} from "@material-ui/core";
import {LoadingIndicator} from "../UtilComponents/LoadingIndicator";
import { useTranslation } from 'react-i18next';
import BuyPlayerPanel from "./BuyPlayerPanel";
import PlayerListForTeam from "./PlayerListForTeam";

function TeamManagementPage(props) {
    const { team, loading } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [selectedPlayerType, setSelectedPlayer] = useState('');

    if (loading) return <LoadingIndicator />;

    const fullTeam = team.team;

    const onBuyPlayerClick = (type) => {
        dispatch({
            type: 'BUY_PLAYER_REQUESTED',
            payload: {
                teamId: fullTeam.teamId,
                playerTypeId: type,
                teamVersion: fullTeam.version},
            playerToBuy: {
                playerTypeId: type,
                playerPositionNumber: "nn",
                starPlayerPoints: 0,
                skills: [
                ],
                playerConfig: {
                    startingSkills: [
                    ],
                    playerStats: {
                        movement: "nn",
                        strength: "nn",
                        agility: "nn",
                        armor: "nn",
                    }
                }
            }

        })
    };

    return (
        <Box mt={3}>
            <Typography variant='h4'>{fullTeam.teamName} ({t("races." + fullTeam.raceId)})</Typography>

            <PlayerListForTeam playerList={team.playerList}/>
            <BuyPlayerPanel value={selectedPlayerType}
                            onPlayerTypeChange={setSelectedPlayer}
                            allowedPlayers={fullTeam.allowedPlayers}
                            teamVersion={team.teamVersion}
                            teamMoney={fullTeam.teamChest.value}
                            onBuyButtonClick={() => onBuyPlayerClick(selectedPlayerType)}/>
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