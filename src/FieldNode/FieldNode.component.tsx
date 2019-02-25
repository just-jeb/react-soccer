import React from 'react';
import {INode} from "../types/field.types";

export interface IFieldNodeProps {
    node: INode;
    booster: boolean,
}

interface NodeAppearance {
    radius: number,
    color: string
}

const simpleNodeAppearance: NodeAppearance = {
    radius: 0.05,
    color: 'grey'
};

const boosterNodeAppearance: NodeAppearance = {
    radius: 0.1,
    color: 'green'
};


export const FieldNodeComponent = React.memo<IFieldNodeProps>(({node: {coordinates: {x, y}}, booster}) => {
    const {radius, color} = booster ? boosterNodeAppearance : simpleNodeAppearance;
    return <circle cx={x} cy={y} r={radius} fill={color}/>;
});
