import React from 'react';
import "./Field.component.css";
import FieldNodeContainer from '../Node/FieldNode.container';
import {ISize} from "../types/common.types";
import PathContainer from "../Path/Path.container";

export interface FieldProps {
    nodesIds: string[],
    fieldSize: ISize,
    nodeSize: ISize
}

export class FieldComponent extends React.PureComponent<FieldProps> {
    render() {
        return this.buildSvg();
    }

    buildSvg() {
        const {fieldSize, nodeSize: {width, height}, nodesIds} = this.props;
        const fieldWidth = (fieldSize.width - 1) * width,
            fieldHeight =(fieldSize.height - 1) * height;

        return (
            <div className={'field'}>
                <svg width={fieldWidth} height={fieldHeight} viewBox={`${width/2} ${height/2} ${fieldWidth} ${fieldHeight}`}>
                    {
                        nodesIds.map(id => <FieldNodeContainer key={id} id={id}/>)
                    }
                <PathContainer/>
                </svg>
            </div>
        )
    }
}

