import React from 'react';
import {INode} from "../types/field.types";

interface GateComponentProps {
    gateNodes: INode[];
}

export const GateComponent = React.memo<GateComponentProps>(({gateNodes}) => {
    return (
        <g>
            {gateNodes.map(({coordinates: {x, y}, id}) =>
                <circle key={id} cx={x} cy={y} r={0.15} fill={'yellow'}/>
            )}
        </g>
    )
});