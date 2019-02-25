import {Reducer} from "redux";
import {EGameStatus, IGame, TConnection} from "../../types/game.types";
import {EGameActionsTypes, GameActions} from "../actions/game.actions";
import {reduceToDictionary, uuid} from "../../utils/common.utils";
import {determineGameStatus, determineNextPlayer} from "../../utils/game.utils";
import {EMetaGameActionsTypes, MetaGameActions} from "../actions/meta-game.actions";

//TODO: find a way to deal with empty state (the default one)
const defaultGameState: IGame = {
    id: '',
    currentPlayer: '',
    ballNode: '',
    gameStatus: EGameStatus.NotStarted,
    path: [],
    boosters: {},
    goals: [],
    players: []
};

export const getGoals = (state: IGame) => state.goals;

export const gameState: Reducer<IGame, GameActions | MetaGameActions> = (state = defaultGameState, action) => {
    switch (action.type) {
        case EGameActionsTypes.START_GAME:
            const {startNodeId, defaultBoosters, goals, players} = action.payload;
            return {
                id: uuid(),
                currentPlayer: players[0].id,
                ballNode: startNodeId,
                gameStatus: EGameStatus.Playing,
                path: [],
                boosters: defaultBoosters,
                //TODO: consider moving to field reducer
                goals,
                players: players
            };
        case EMetaGameActionsTypes.LOAD_GAME:
            return action.payload.game;
        case EGameActionsTypes.MAKE_MOVE:
            const newBallNode = action.payload;
            const {ballNode, currentPlayer, path, boosters} = state;
            const connection: TConnection = [ballNode, newBallNode];

            let nextPlayer = determineNextPlayer(state, newBallNode);
            let gameStatus = determineGameStatus(state, newBallNode);
            //TODO: win case for the second player when no moves left for the current one
            const winner = gameStatus === EGameStatus.End ? currentPlayer : undefined;
            return {
                ...state,
                currentPlayer: nextPlayer,
                //TODO: consider moving to field reducer
                ballNode: newBallNode,
                path: [...path, connection],
                boosters: {...boosters, [newBallNode]: true},
                //End of TODO
                gameStatus,
                winner
            };
        default:
            return state;
    }
};