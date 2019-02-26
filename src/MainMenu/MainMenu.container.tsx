import React from 'react';
import {ELocalStorageKeys, loadFromLocalStorage} from "../utils/local-storage.utils";
import {MainMenuComponent} from "./MainMenu.component";

interface IState {
    lastGameId?: string;
}

export class MainMenuContainer extends React.PureComponent<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    componentDidMount(): void {
        this.setState({
            lastGameId: loadFromLocalStorage(ELocalStorageKeys.LAST_GAME_ID)
        })
    }

    render(): React.ReactNode {
        return <MainMenuComponent lastGameId={this.state.lastGameId}/>;
    }

}