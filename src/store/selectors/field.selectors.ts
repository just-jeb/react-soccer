import {IState} from "../state";
import {createSelector} from "reselect";

export const fieldStateSelector = (state: IState) => state.fieldState;

//No need for createSelector here as there is nothing to memoize (no computed state, just simple dereference)
export const nodesSelector = (state: IState) => fieldStateSelector(state).nodes;
export const nodeSelector = (state: IState, props: { id: string }) => nodesSelector(state)[props.id];

//Data transformation => need for memoization
export const nodeIdsSelector = createSelector(
    nodesSelector,
    nodes => Object.keys(nodes)
);