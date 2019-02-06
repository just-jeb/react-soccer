import React, {Component} from 'react';
import './App.css';
import FieldContainer from "./Field/Field.container";
import {Provider} from 'react-redux';
import {store} from "./store/store";

const nodeSize = 50;

const fieldSize = {width: 11, height: 5}

const nodes = Array(fieldSize.width * fieldSize.height).fill(null).map((node, index) => ({
    coordinates: {x: (index % fieldSize.width) * nodeSize, y: Math.floor(index / fieldSize.width) * nodeSize},
    booster: Math.random() > 0.7
}));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
            <div>
                <header className="App-header">
                    Soccer game
                </header>
                <div className="App">
                    <FieldContainer/>
                </div>
            </div>
            </Provider>
        );
    }
}

export default App;
