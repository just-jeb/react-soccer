import React from 'react';
import styles from "./Field.module.scss";
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
        const {fieldSize, nodesIds} = this.props;
        //TODO: move SVG width to CSS
        return (
            <div className={styles.field}>
                <svg width={700}
                     viewBox={`0.5 0.5 ${fieldSize.width} ${fieldSize.height}`}
                     preserveAspectRatio={'xMidYMid meet'}>
                    <PathContainer/>
                    {nodesIds.map(id => <FieldNodeContainer key={id} id={id}/>)}
                </svg>
            </div>
        )
    }
}

