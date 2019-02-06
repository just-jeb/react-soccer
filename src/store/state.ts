import {IField} from "../types/IField";
import {ISettings} from "../types/ISettings";

export interface IState {
    readonly fieldState: IField;
    readonly settings: ISettings;
}

