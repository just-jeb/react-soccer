import {Reducer} from "redux";
import {IField} from "../../types/field.types";
import {FieldActions, FieldActionsTypes} from "../actions/field.actions";
import {reduceToDictionary} from "../../utils/common.utils";

const defaultFieldState: IField = {nodes: {}};

//TODO: consider uniting field and game reducers
export const fieldState: Reducer<IField, FieldActions> = (state = defaultFieldState, action: FieldActions) => {
    switch (action.type) {
        case FieldActionsTypes.CREATE_NODES:
            const {payload: nodes} = action;
            return {...state, nodes: reduceToDictionary(nodes, 'id')};
        default:
            return state;
    }
};