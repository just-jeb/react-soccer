import React, { PureComponent } from 'react';
import { INode, TBoosters } from '../types/field.types';
import { FieldNodeComponent } from '../FieldNode/FieldNode.component';

interface IProps {
  nodes: INode[];
  boosters: TBoosters;
  boosterColor: string;
}

const BOOSTER_RADIUS = 10;

const SIMPLE_NODE = {
  radius: 8,
  color: '#FFFFFF',
};

export class FieldNodesComponent extends PureComponent<IProps> {
  renderFieldNode = (node: INode, booster: boolean) => {
    const { radius, color } = booster
      ? { radius: BOOSTER_RADIUS, color: this.props.boosterColor }
      : SIMPLE_NODE;
    return (
      <FieldNodeComponent
        key={node.id}
        node={node}
        radius={radius}
        color={color}
      />
    );
  };

  render(): React.ReactNode {
    return (
      <>
        {this.props.nodes.map((node) =>
          this.renderFieldNode(node, this.props.boosters[node.id]),
        )}
      </>
    );
  }
}
