import {Reducer} from "redux";
import {Field, INode} from "../types/field.types";
import {FieldActions, FieldActionsTypes} from "../actions/field.actions";

const defaultFieldState: Field = {nodesIds: [], nodes: {}, path: []};

export const fieldState: Reducer<Field, FieldActions> = (state = defaultFieldState, action: FieldActions) => {
    switch (action.type) {
        case FieldActionsTypes.CREATE_NODES:
            const {payload: nodes} = action;
            const newNodes = nodes.reduce((field: Pick<Field, 'nodesIds' | 'nodes'>, node: INode) => {
                const {coordinates: {x, y}} = node;
                const nodeId = `${x},${y}`;
                field.nodesIds.push(nodeId);
                field.nodes[nodeId] = node;
                return field;
            }, {nodes: {}, nodesIds: []});
            return {...state, ...newNodes};
        default:
            return state;
    }
};