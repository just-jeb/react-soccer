import {IPoint} from "../types/common.types";
import React from 'react';

interface BallComponentProps {
    ballPosition: IPoint;
}

export const BallComponent = React.memo<BallComponentProps>(({ballPosition: {x,y}}) => {
    return <circle cx={x} cy={y} r={0.15} fill={'red'}/>
});