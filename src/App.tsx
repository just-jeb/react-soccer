import React, {Component} from 'react';
import styles from './App.module.scss';
import {Provider} from 'react-redux';
import {store} from "./store/store";
import MainMenuContainer from './MainMenu/MainMenu.container';
import StartGameContainer from './StartGame/StartGame.container';
import {CentralizerComponent} from "./Centralizer/Centralizer.component";
import {Redirect, Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";

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
                                <Route exact path={'/main-menu'} component={MainMenuContainer}/>
                                <Route exact path={'/game/:id?'} component={StartGameContainer}/>
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
