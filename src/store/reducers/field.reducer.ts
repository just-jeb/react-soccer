import {Reducer} from "redux";
import {IField} from "../../types/field.types";
import {FieldActions, FieldActionsTypes} from "../actions/field.actions";
import {reduceToDictionary} from "../../utils/common.utils";
import {EMetaGameActionsTypes, MetaGameActions} from "../actions/meta-game.actions";

const defaultFieldState: IField = {nodes: {}};

//TODO: consider uniting field and game reducers
export const fieldState: Reducer<IField, FieldActions | MetaGameActions> = (state = defaultFieldState, action) => {
    switch (action.type) {
        case FieldActionsTypes.CREATE_NODES:
            const {payload: nodes} = action;
            return {...state, nodes: reduceToDictionary(nodes, 'id')};
        case EMetaGameActionsTypes.LOAD_GAME:
            return action.payload.field;
        default:
            return state;
    }
};