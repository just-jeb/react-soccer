import React, {Component} from 'react';
import styles from './App.module.scss';
import {Provider} from 'react-redux';
import {store} from "./store/store";
import MainMenuContainer from './MainMenu/MainMenu.container';
import GameContainer from './Game/Game.container';
import {CentralizerComponent} from "./Centralizer/Centralizer.component";
import {Redirect, Route, Switch} from "react-router";

class App extends Component {


    render() {
        return (
            <Provider store={store}>
                <div className={styles.App}>
                    <header className={styles.appHeader}>
                        Soccer game
                    </header>
                    {/*<div className="App">*/}
                    {/*<GameContainer/>*/}
                    {/*</div>*/}
                    <CentralizerComponent>
                        <Switch>
                            <Route exact path={'/main-menu'} component={MainMenuContainer}/>
                            <Route exact path={'/game'} component={GameContainer}/>
                            <Redirect from={'/'} to={'main-menu'}/>
                        </Switch>
                    </CentralizerComponent>
                </div>
            </Provider>
        );
    }
}

export default App;
