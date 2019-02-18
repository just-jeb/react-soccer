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
        const {fieldSize, nodeSize, nodesIds} = this.props;
        console.log(nodesIds)
        return (
            <div className={'field'}>
                <svg width={fieldSize.width * nodeSize.width} height={fieldSize.height * nodeSize.height}>
                    {
                        //TODO: What is the problem here?
                        nodesIds.map(id => <FieldNodeContainer id={id}/>)
                    }
                <PathContainer/>
                </svg>
            </div>
        )
    }
}