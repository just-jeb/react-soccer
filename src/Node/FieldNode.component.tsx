import React from 'react';
import "./FieldNode.component.css";
import {INode} from "../types/field.types";
import {ISize} from "../types/common.types";

export interface IFieldNodeProps {
    node: INode;
    nodeSize: ISize,
    boosterRadius: number,
    isBallNode: boolean
}


export class FieldNodeComponent extends React.PureComponent<IFieldNodeProps> {
    getNodeColor = () => {
        const {node: {booster}, isBallNode} = this.props;
        //TODO: move magic constants to rendering settings
        let color = 'grey';
        if(isBallNode){
            color = 'red';
        } else if (booster){
            color = 'green';
        }
        return color;
    };

    getNodeRadius = () => {
        const {boosterRadius, isBallNode, node: {booster}} = this.props;
        //TODO: move magic constants to rendering settings
        let radius = 1;
        if(isBallNode){
            radius = 7;
        } else if(booster) {
            radius = boosterRadius;
        }
        return radius;
    };

    render(){
        const {node: {coordinates: {x, y}}, nodeSize: {width, height}} = this.props;
        const color = this.getNodeColor();
        const radius = this.getNodeRadius();
        return (
            <circle cx={x * width} cy={y * height} r={radius} fill={color}/>
        )
    }
}