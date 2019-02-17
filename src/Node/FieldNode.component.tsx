import React from 'react';
import "./FieldNode.component.css";
import {INode} from "../types/field.types";
import {ISize} from "../types/common.types";

export interface IFieldNodeProps {
    node: INode;
    nodeSize: ISize,
    boosterRadius: number
}


export class FieldNodeComponent extends React.PureComponent<IFieldNodeProps> {
    render(){
        const {node: {coordinates: {x, y}, booster}, nodeSize: {width, height}, boosterRadius} = this.props;
        return (
            <circle cx={x * width} cy={y * height} r={boosterRadius} fill={booster ? "green" : "grey"}/>
        )
    }
}