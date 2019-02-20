import React from 'react';
import styles from "./Field.module.scss";
import FieldNodeContainer from '../FieldNode/FieldNode.container';
import {IDimensions} from "../types/common.types";
import PathContainer from "../Path/Path.container";
import NextMovesGrid from '../NextMovesGrid/NextMovesGrid.container';

export interface FieldProps {
    nodesIds: string[],
    fieldSize: IDimensions,
}

export class FieldComponent extends React.PureComponent<FieldProps> {
    render() {
        return this.buildSvg();
    }

    buildSvg() {
        const {fieldSize, nodesIds} = this.props;
        //TODO: move SVG width and preserveAspectRation to CSS
        return (
            <div className={styles.field}>
                <svg width={700}
                     viewBox={`0 0 ${fieldSize.width - 1} ${fieldSize.height - 1}`}
                     preserveAspectRatio={'xMidYMid meet'}>
                    <PathContainer/>
                    {
                        nodesIds.map(id => <FieldNodeContainer key={id} id={id}/>)
                    }
                    <NextMovesGrid/>
                </svg>
            </div>
        )
    }
}

