import { Reducer } from 'redux';
import { IField, TConnection } from '../../types';
import { reduceToDictionary } from '../../utils/common.utils';
import {
  EMetaGameActionsTypes,
  MetaGameActions,
} from '../actions/meta-game.actions';
import { EFieldActionsTypes, FieldActions } from '../actions/field.actions';

const defaultFieldState: IField = {
  nodes: {},
  ballNode: '',
  path: [],
  boosters: {},
  goals: [],
};

export const getGoals = ({ goals }: IField) => goals;
export const getNodes = ({ nodes }: IField) => nodes;
export const getPath = ({ path }: IField) => path;
export const getBoosters = ({ boosters }: IField) => boosters;
export const getBallNode = ({ ballNode }: IField) => ballNode;

export const fieldState: Reducer<IField, FieldActions | MetaGameActions> = (
  state = defaultFieldState,
  action,
) => {
  switch (action.type) {
    case EMetaGameActionsTypes.START_GAME:
      const { startNodeId, defaultBoosters, goals, nodes } = action.payload;
      return {
        ...state,
        ballNode: startNodeId,
        path: [],
        boosters: defaultBoosters,
        goals,
        nodes: reduceToDictionary(nodes, 'id'),
      };
    case EFieldActionsTypes.MOVE_BALL:
      console.log('MOve ball reducers');
      const { nodeId } = action.payload;
      const { ballNode, path, boosters } = state;
      const connection: TConnection = [ballNode, nodeId];
      console.log('Ball node inside reducer', nodeId);
      return {
        ...state,
        ballNode: nodeId,
        path: [...path, connection],
        boosters: { ...boosters, [ballNode]: true },
      };
    case EMetaGameActionsTypes.LOAD_GAME:
      return action.payload.field;
    default:
      return state;
  }
};
