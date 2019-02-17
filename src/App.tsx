import React, {Component} from 'react';
import './App.css';
import FieldContainer from "./Field/Field.container";
import {Provider} from 'react-redux';
import {store} from "./store/store";
import {initializeGame} from "./actions/field.actions";

class App extends Component {
    componentDidMount(): void {
        //TODO: initialize from UI and use "connect" for dispatch
        store.dispatch(initializeGame());
    }

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
