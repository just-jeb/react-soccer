import React, {Component} from 'react';
import './App.css';
import FieldContainer from "./Field/Field.container";
import {Provider} from 'react-redux';
import {store} from "./store/store";
import {initializeGame} from "./actions/game.actions";
import {gameStatusSelector} from "./selectors/game.selectors";
import {EGameStatus} from "./types/game.types";

class App extends Component {
    componentDidMount(): void {
        //TODO: initialize from UI and use "connect" for dispatch
        store.dispatch(initializeGame());
        this.forceUpdate();
    }

    getGameScreen = () => {
        return gameStatusSelector(store.getState()) === EGameStatus.NotStarted ? <div/> : <FieldContainer/>;
    };

    render() {



        return (
            <Provider store={store}>
                <div>
                    <header className="App-header">
                        Soccer game
                    </header>
                    <div className="App">
                        {this.getGameScreen()}
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;
