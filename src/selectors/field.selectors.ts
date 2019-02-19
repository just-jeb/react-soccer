import {IState} from "../store/state";

export const fieldStateSelector = (state: IState) => state.fieldState;

//No need for createSelector here as there is nothing to memoize (no computed state, just simple dereference)
export const nodeIdsSelector = (state: IState) => fieldStateSelector(state).nodesIds;
export const nodesSelector = (state: IState) => fieldStateSelector(state).nodes;
export const nodeSelector = (state: IState, props: { id: string }) => nodesSelector(state)[props.id];

