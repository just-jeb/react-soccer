import React, {Component} from 'react';
import styles from './App.module.scss';
import {Provider} from 'react-redux';
import {store} from "./store/store";
import GameContainer from './Game/Game.container';
import {CentralizerComponent} from "./Centralizer/Centralizer.component";
import {Redirect, Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import SavedGamesContainer from './SavedGames/SavedGames.container';
import {MainMenuComponent} from "./MainMenu/MainMenu.component";

class App extends Component {


    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <div className={styles.App}>
                        <header className={styles.appHeader}>
                            Soccer game
                        </header>
                        <CentralizerComponent>
                            <Switch>
                                <Route exact path={'/main-menu'} component={MainMenuComponent}/>
                                <Route exact path={'/game/:id?'} component={GameContainer}/>
                                <Route exact path={'/load-game'} component={SavedGamesContainer}/>
                                <Redirect exact from={'/'} to={'main-menu'}/>
                            </Switch>
                        </CentralizerComponent>
                    </div>
                </Provider>
            </BrowserRouter>
        );
    }
}

export default App;
