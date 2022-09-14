import { combineReducers } from 'redux';
import adminReducer from './admin/reducer';


export type State = {
  admin: any;
};

const reducers = combineReducers<State>({
  admin: adminReducer,
});

export default reducers;
