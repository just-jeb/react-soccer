import {Reducer} from "redux";
import {IField, INode} from "../types/field.types";
import {FieldActions, FieldActionsTypes} from "../actions/field.actions";
import {getNodeId} from "../utils/game.utils";

const defaultFieldState: IField = {nodesIds: [], nodes: {}};

export const fieldState: Reducer<IField, FieldActions> = (state = defaultFieldState, action: FieldActions) => {
    switch (action.type) {
        case FieldActionsTypes.CREATE_NODES:
            const {payload: nodes} = action;
            const newNodes = nodes.reduce((field: Pick<IField, 'nodesIds' | 'nodes'>, node: INode) => {
                const nodeId = getNodeId(node);
                field.nodesIds.push(nodeId);
                field.nodes[nodeId] = node;
                return field;
            }, {nodes: {}, nodesIds: []});
            return {...state, ...newNodes};
        default:
            return state;
    }
};