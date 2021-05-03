import { combineEpics, createEpicMiddleware } from 'redux-observable';
import todoEpics from './epics/todo-epics';

export const rootEpic = combineEpics(todoEpics);

export default createEpicMiddleware();