import {Reducer} from "redux";
import {IField} from "../types/IField";

const defaultFieldState: IField = {nodesIds: [], nodes: {}, connections: []};

export const fieldState: Reducer<IField> = (state = defaultFieldState, action) => {
    switch (action.type) {
        case 'A':
            return state;
        case 'B':
            return state;
        default:
            return state;
    }
}