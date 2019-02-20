import {Reducer} from "redux";
import {IField, INode} from "../../types/field.types";
import {FieldActions, FieldActionsTypes} from "../actions/field.actions";

const defaultFieldState: IField = {nodesIds: [], nodes: {}};

export const fieldState: Reducer<IField, FieldActions> = (state = defaultFieldState, action: FieldActions) => {
    switch (action.type) {
        case FieldActionsTypes.CREATE_NODES:
            const {payload: nodes} = action;
            const newNodes = nodes.reduce((field: Pick<IField, 'nodesIds' | 'nodes'>, node: INode) => {
                field.nodesIds.push(node.id);
                field.nodes[node.id] = node;
                return field;
            }, {nodes: {}, nodesIds: []});
            return {...state, ...newNodes};
        default:
            return state;
    }
};