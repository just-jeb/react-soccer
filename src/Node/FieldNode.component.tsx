import React from 'react';
import "./FieldNode.component.css";
import {INode} from "../types/field.types";
import {ISize} from "../types/common.types";

export interface IFieldNodeProps {
    node: INode;
    nodeSize: ISize,
    boosterRadius: number,
    isBallNode: boolean,
    booster: boolean,
    onClick: () => void
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
        const {boosterRadius, isBallNode, booster} = this.props;
        //TODO: move magic constants to rendering settings
        let radius = 1;
        if (isBallNode) {
            radius = 7;
        } else if (booster) {
            radius = boosterRadius;
        }
        return radius;
    };

    render() {
        const {node: {coordinates: {x, y}}, nodeSize: {width, height}} = this.props;
        const color = this.getNodeColor();
        const radius = this.getNodeRadius();
        return (
            <g transform={`translate(${x * width}, ${y * height})`} onClick={this.props.onClick}>
                <circle cx={width/2} cy={height/2} r={radius} fill={color}/>
                <rect cx={0} cy={0} width={width} height={height} fillOpacity={0} strokeOpacity={0}/>
            </g>
        )
    }
}