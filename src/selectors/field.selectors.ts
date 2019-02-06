import {IState} from "../store/state";

export const fieldStateSelector = (state: IState) => state.fieldState;

export const nodeIdsSelector = (state: IState) => state.fieldState.nodesIds;
export const nodesSelector = (state: IState) => fieldStateSelector(state).nodes;
export const nodeSelector = (state: IState, props: { id: string }) => nodesSelector(state)[props.id];
