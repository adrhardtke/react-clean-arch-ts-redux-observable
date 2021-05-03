import { combineEpics, createEpicMiddleware } from 'redux-observable';
import todoEpics from './todo-epics';

export const rootEpic = combineEpics(todoEpics);

export default createEpicMiddleware();