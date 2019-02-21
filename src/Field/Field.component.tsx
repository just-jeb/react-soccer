import React from 'react';
import styles from "./Field.module.scss";
import FieldNodeContainer from '../FieldNode/FieldNode.container';
import {IDimensions} from "../types/common.types";
import PathContainer from "../Path/Path.container";
import NextMovesGrid from '../NextMovesGrid/NextMovesGrid.container';
import BallContainer from '../Ball/Ball.container';
import {EGameStatus, IPlayer} from "../types/game.types";
import GateContainer from '../Gate/Gate.container';

export interface FieldProps {
    nodesIds: string[],
    fieldSize: IDimensions,
    gameStatus: EGameStatus,
    players: IPlayer[]
}

const FIELD_BORDER_COLOR = 'coral';

export class FieldComponent extends React.PureComponent<FieldProps> {
    render() {
        return this.buildSvg();
    }

    renderFieldNode = (id: string) => <FieldNodeContainer key={id} id={id}/>

    //TODO: consider passing player id and not the whole player
    renderGate = (player: IPlayer) => <GateContainer key={player.id} player={player}/>

    buildSvg() {
        const {fieldSize: {width, height}, nodesIds, gameStatus, players} = this.props;
        const middle = Math.floor(width / 2);
        //TODO: move SVG width and preserveAspectRation to CSS
        return (
            <div className={styles.field}>
                <svg width={700}
                     viewBox={`0 0 ${width - 1} ${height - 1}`}
                     preserveAspectRatio={'xMidYMid meet'}>
                    <g stroke={`${FIELD_BORDER_COLOR}`}>
                        <rect width={width - 1} height={height - 1} fillOpacity={0} strokeWidth={0.1}/>
                        <line x1={middle} y1={0} x2={middle} y2={height - 1} strokeWidth={0.05}/>
                    </g>
                    <PathContainer/>
                    {nodesIds.map(this.renderFieldNode)}
                    {players.map(this.renderGate)}
                    {gameStatus === EGameStatus.Playing && <NextMovesGrid/>}
                    <BallContainer/>
                </svg>
            </div>
        )
    }
}

