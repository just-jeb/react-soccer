import React, {Component} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {store} from "./store/store";
import GameContainer from "./Game/Game.container";

class App extends Component {


    render() {
        return (
            <Provider store={store}>
                <div>
                    <header className="App-header">
                        Soccer game
                    </header>
                    <div className="App">
                        <GameContainer/>
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;
