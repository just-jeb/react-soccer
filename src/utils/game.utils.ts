import {EGameStatus, IGame, TConnection} from "../types/game.types";
import {INode} from "../types/field.types";

export const nodesConnected = (node1: INode, node2: INode, path: TConnection[]) => {
    return path.some(([id1, id2]) => (id1 === node1.id && id2 === node2.id)
        || (id1 === node2.id && id2 === node1.id))
};

//TODO: use type of makeMove action payload instead of newBallNode and string
export const determineNextPlayer = ({boosters, currentPlayer, players}: IGame, newBallNode: string): string => {
    if (!boosters[newBallNode]) {
        const i = players.findIndex(p => p.id === currentPlayer);
        const nextIndex = (i + 1) % players.length;
        return players[nextIndex].id;
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