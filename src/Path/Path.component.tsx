import React from 'react';
import {ConnectionCoords} from "../types/field.types";
import {transformCoordinates} from "../utils/rendering.utils";

interface PathComponentProps {
    pathCoords: ConnectionCoords[];

}

export const PathComponent = React.memo<PathComponentProps>(({pathCoords}) => {
    //Ignore p2 for now as next point should start with that
    const points = pathCoords.map(([p1, p2]) => p1)
        .map(p => transformCoordinates(p))
        .map(({x, y}) => `${x} ${y}`).join(', ');
    return <polyline points={points} fill={'none'} stroke={'black'} strokeWidth={3}/>
});