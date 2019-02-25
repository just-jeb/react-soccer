import React from 'react';
import {INode} from "../types/field.types";

interface NextMovesGridProps {
    nextMoves: INode[];
    hintColor: string | undefined;
    makeMove: (id: string) => void;
}

export const NextMovesGridComponent = React.memo<NextMovesGridProps>(({nextMoves, makeMove, hintColor}) => {
    return (
        <>
            {
                nextMoves.map(({coordinates: {x, y}, id}) =>
                    <g key={id} transform={`translate(${x - 0.5}, ${y - 0.5})`} onClick={() => makeMove(id)}>
                        <circle cx={0.5} cy={0.5} r={0.1} stroke={hintColor} strokeWidth={0.03} fillOpacity={0}>
                            <animate attributeName="r" begin="0s" dur="1s" repeatCount="indefinite"
                                     from="0.1" to="0.1" values='0.1; 0.11; 0.12; 0.13; 0.12; 0.11; 0.1'
                                     keyTimes={'0; 0.1; 0.3; 0.5; 0.7; 0.9; 1'}/>
                        </circle>
                        <rect cx={0} cy={0} width={1} height={1} fillOpacity={0} strokeOpacity={0}/>
                    </g>
                )
            }
        </>
    );
});
