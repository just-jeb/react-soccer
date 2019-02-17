import {Reducer} from "redux";
import {Field, INode} from "../types/field.types";
import {FieldActions, FieldActionsTypes} from "../actions/field.actions";

//TODO: decide whether size should be part of the settings or not
const defaultFieldState: Field = {nodesIds: [], nodes: {}};

export const fieldState: Reducer<Field, FieldActions> = (state = defaultFieldState, action: FieldActions) => {
    switch (action.type) {
        case FieldActionsTypes.CREATE_NODES:
            const {payload: nodes} = action;
            return nodes.reduce((field: Field, node: INode) => {
                const {coordinates: {x, y}} = node;
                console.log(1);
                const nodeId = `${x},${y}`;
                field.nodesIds.push(nodeId);
                field.nodes[nodeId] = node;
                return field;
            }, {nodes: {}, nodesIds: []});
        default:
            return state;
    }
};