import React from 'react';
import "./FieldNode.component.css";
import {INode} from "../types/INode";

export interface IFieldNodeProps {
    node: INode;
    dotRadius: number
}


export class FieldNodeComponent extends React.PureComponent<IFieldNodeProps> {
    render(){
        return (
            <circle cx={this.props.node.coordinates.x} cy={this.props.node.coordinates.y} r={this.props.dotRadius} fill={this.props.node.booster ? "green" : "grey"}/>
        )
    }
}