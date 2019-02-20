import React from 'react';
import {INode} from "../types/field.types";

interface NextMovesGridProps {
    nextMoves: INode[];
    onClick: (id: string) => void;
}

export const NextMovesGridComponent = React.memo<NextMovesGridProps>((props) => {
    return (<g>
            {
                props.nextMoves.map(({coordinates: {x, y}, id}) =>
                    <g key={id} transform={`translate(${x - 0.5}, ${y - 0.5})`} onClick={() => props.onClick(id)}>
                        <circle cx={0.5} cy={0.5} r={0.1} stroke={'blue'} strokeWidth={0.03} fillOpacity={0}/>
                        <rect cx={0} cy={0} width={1} height={1} fillOpacity={0} strokeOpacity={0}/>
                    </g>
                )
            }
        </g>);
});
