import React, { useEffect} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Switch, Route, Link } from "react-router-dom";
import MyTeamPage from "./MyTeam/MyTeamPage";
import UpcomingGamePage from "./UpcominGames/UpcomingGamesPage";
import Home from "./Home/HomePage";
import {useTranslation, withTranslation} from 'react-i18next';

import Container from "@material-ui/core/Container";
import {useDispatch} from 'react-redux'
import i18n from "i18next";

function AppContent() {
    const dispatch = useDispatch()
    const { t } = useTranslation()


    useEffect(() => {
        dispatch({type: 'FETCH_MY_TEAM_REQUESTED', payload: { teamId: '406d35ee-421a-4d45-9f34-1834d5acd215' }})
    }, [dispatch]);

    useEffect(() => {
        dispatch({type: 'UPCOMING_GAMES_REQUESTED', payload: { seasonId: '7a097eae-be35-4b4d-a23d-98a6b57534f3' }})
    }, [dispatch]);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    return(
        <>
            <AppBar position="static">
                <Toolbar>
                    <Button size={'large'} component={Link} to={'/'} color="inherit">KABBL</Button>
                    <Button size={'large'} component={Link} to={'/upcoming-games'} color="inherit">{t("appContent.GameDays")}</Button>
                    <Button size={'large'} component={Link} to={'/my-team'} color="inherit">{t("appContent.MyTeam")}</Button>
                    <div style={{ marginLeft: 'auto' }}>
                        <Button onClick={() => changeLanguage('de')}>DE</Button>
                        <Button onClick={() => changeLanguage('en')}>EN</Button>
                    </div>
                </Toolbar>
            </AppBar>


            <Container maxWidth={'md'}>
                <Switch>
                    <Route path="/upcoming-games">
                        <UpcomingGamePage />
                    </Route>
                    <Route path="/my-team">
                        <MyTeamPage />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Container>
        </>
    )
}

export default withTranslation()(AppContent);
