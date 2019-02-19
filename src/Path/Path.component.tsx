import React from 'react';
import {TConnectionCoords} from "../types/game.types";
import {transformCoordinates} from "../utils/rendering.utils";

interface PathComponentProps {
    pathCoords: TConnectionCoords[];

}

export const PathComponent = React.memo<PathComponentProps>(({pathCoords}) => {
    const points = pathCoords.map(([p1, p2]) => [transformCoordinates(p1), transformCoordinates(p2)])
    //Ignore all p2 for now except for the last one as the next point should start with that
        .map(([{x: x1, y: y1}, {x: x2, y: y2}], index) =>
            index === pathCoords.length - 1 ? `${x1} ${y1}, ${x2} ${y2}` : `${x1} ${y1}`)
        .join(', ');
    return <polyline points={points} fill={'none'} stroke={'black'} strokeWidth={3}/>
});