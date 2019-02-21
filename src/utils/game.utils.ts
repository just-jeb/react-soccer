import {EGameStatus, EPlayers, IGame, TConnection} from "../types/game.types";
import {INode} from "../types/field.types";

export const nodesConnected = (node1: INode, node2: INode, path: TConnection[]) => {
    return path.some(([id1, id2]) => (id1 === node1.id && id2 === node2.id)
        || (id1 === node2.id && id2 === node1.id))
};

//TODO: use type of makeMove action payload instead of newBallNode and string
export const determineNextPlayer = ({boosters, currentPlayer}: IGame, newBallNode: string): EPlayers => {
    if (!boosters[newBallNode]) {
        return currentPlayer === EPlayers.PLAYER1 ? EPlayers.PLAYER2 : EPlayers.PLAYER1;
    } else {
        return currentPlayer;
    }
};

export const determineGameStatus = ({gates, gameStatus}: IGame, newBallNode: string): EGameStatus => {
    const capturedGate = Object.values(gates).find(g => g.nodes.includes(newBallNode));
    if (capturedGate) {
        return EGameStatus.EndWin;
    } else {
        return gameStatus;
    }
};