import React from 'react';
import {ISavedGameHeader} from "../types/meta-game.types";
import {SavedGameComponent} from "../SavedGame/SavedGame.component";

interface Props {
  savedGames: ISavedGameHeader[],
  loadGamesList: () => void;
}

export class SavedGamesComponent extends React.PureComponent<Props> {
  componentDidMount(): void {
    this.props.loadGamesList();
  }

  render() {
    const {savedGames} = this.props;
    return (
      <div>
        {savedGames.map(game => <SavedGameComponent key={game.id} savedGame={game}/>)}
      </div>
    )
  }
}