import React, {PureComponent} from 'react';
import {INode} from "../types/field.types";
import {TBoosters} from "../types/game.types";
import {FieldNodeComponent} from "../FieldNode/FieldNode.component";

interface IProps {
    nodes: INode[],
    boosters: TBoosters
}

export class FieldNodesComponent extends PureComponent<IProps> {
    renderFieldNode = (node: INode, booster: boolean) =>
        <FieldNodeComponent key={node.id} node={node} booster={booster}/>

    render(): React.ReactNode {
        return (
            <>
                {this.props.nodes.map(node => this.renderFieldNode(node, this.props.boosters[node.id]))}
            </>
        );
    }
}