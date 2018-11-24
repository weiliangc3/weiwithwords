import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import dummy from './dummy';

// No state really required. Here for documentation.
export default (history) => combineReducers({
  router: connectRouter(history),
  dummy,
});