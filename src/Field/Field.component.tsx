import React from 'react';
import "./Field.component.css";
import FieldNodeContainer from '../Node/FieldNode.container';

export interface FieldProps {
    nodesIds: string[],
    fieldSize: { width: number, height: number },
    nodeSize: number
}


export class FieldComponent extends React.PureComponent<FieldProps> {
    render() {
        return this.buildSvg();
    }

    buildSvg() {
        return (
            <div className={'field'}>
                <svg width={this.props.fieldSize.width * this.props.nodeSize}
                     height={this.props.fieldSize.height * this.props.nodeSize}>
                    {this.props.nodesIds.map(id =>
                        <FieldNodeContainer id={id}/>
                    )}
                    <polyline points={"50 100, 100 100, 150 50"} fill={'none'} stroke={'black'} strokeWidth={3}/>
                </svg>
            </div>
        )
    }
}