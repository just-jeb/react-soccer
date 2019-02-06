import {ISettings} from "../types/ISettings";
import {Reducer} from "redux";

const defaultSettings: ISettings = {dotRadius: 5, fieldSize: {width: 11, height: 5}, nodeSize: 50};

export const settings: Reducer<ISettings> = (state = defaultSettings, action) => {
    switch (action.type) {
        case 'A':
            return state;
        default:
            return state;
    }
};