import React from 'react';
import "./FieldNode.component.css";
import {INode} from "../types/field.types";

export interface IFieldNodeProps {
    node: INode;
    isBallNode: boolean,
    booster: boolean,
}


export class FieldNodeComponent extends React.PureComponent<IFieldNodeProps> {
    getNodeColor = () => {
        const {booster, isBallNode} = this.props;
        //TODO: move magic constants to rendering settings
        let color = 'grey';
        if (isBallNode) {
            color = 'red';
        } else if (booster) {
            color = 'green';
        }
        return color;
    };

    getNodeRadius = () => {
        const {isBallNode, booster} = this.props;
        //TODO: move magic constants to rendering settings
        let radius = 0.05;
        if (isBallNode) {
            radius = 0.15;
        } else if (booster) {
            radius = 0.1;
        }
        return radius;
    };

    render() {
        const {node: {coordinates: {x, y}}} = this.props;
        const color = this.getNodeColor();
        const radius = this.getNodeRadius();
        return (
                <circle cx={x} cy={y} r={radius} fill={color}/>
        )
    }
}