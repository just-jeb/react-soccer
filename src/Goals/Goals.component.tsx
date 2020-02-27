import React, { PureComponent } from 'react';
import { IGoal } from '../types/field.types';
import GoalContainer from '../Goal/Goal.container';

interface IProps {
  goals: IGoal[];
}

export class GoalsComponent extends PureComponent<IProps> {
  renderGoal = (goal: IGoal) => <GoalContainer key={goal.owner} goal={goal} />;

  render(): React.ReactNode {
    return <>{this.props.goals.map(this.renderGoal)}</>;
  }
}
