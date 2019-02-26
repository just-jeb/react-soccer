import React from 'react';
import {TConnectionCoords} from "../types/field.types";

interface PathComponentProps {
  pathCoords: TConnectionCoords[];

}

export const PathComponent = React.memo<PathComponentProps>(({pathCoords}) => {
  //Ignore all p2 for now except for the last one as the next point should start with that
  const points = pathCoords.map(([{x: x1, y: y1}, {x: x2, y: y2}], index) =>
    index === pathCoords.length - 1 ? `${x1} ${y1}, ${x2} ${y2}` : `${x1} ${y1}`)
    .join(', ');
  return (<polyline points={points} fill={'none'} stroke={'black'}
                    strokeWidth={0.07}/>)
});