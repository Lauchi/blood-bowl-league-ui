import { call, put, takeEvery } from 'redux-saga/effects'
import {buyPlayer, fetchTeamCall} from "../Backend/TeamRepository";

function* fetchTeam(action) {
    try {
        const team = yield call(fetchTeamCall, action.payload.teamId);
        yield put({type: "FETCH_TEAM_SUCEEDED", team: team});
    } catch (e) {
        yield put({type: "FETCH_TEAM_FAILED", message: e.message});
    }
}

export function* fetchTeamSaga() {
    yield takeEvery("FETCH_TEAM_REQUESTED", fetchTeam)
}

function* buyPlayerFunc(action) {
    try {
        const payload = action.payload;
        const playerToBuy = action.playerToBuy;
        const player = yield call(buyPlayer, payload.teamId, payload.playerTypeId, payload.teamVersion);
        playerToBuy.playerId = player.playerId
        yield put({type: "BUY_PLAYER_SUCEEDED", playerToBuy: playerToBuy });
    } catch (e) {
        yield put({type: "BUY_PLAYER_FAILED", message: e.message});
    }
}

export function* buyPlayerSaga() {
    yield takeEvery("BUY_PLAYER_REQUESTED", buyPlayerFunc)
}