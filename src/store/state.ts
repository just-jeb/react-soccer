import {Field} from "../types/field.types";
import {IGameSettings, IRenderingSettings} from "../types/settings.types";

export interface IState {
    readonly fieldState: Field;
    readonly gameSettings: IGameSettings;
    readonly renderingSettings: IRenderingSettings;
}

