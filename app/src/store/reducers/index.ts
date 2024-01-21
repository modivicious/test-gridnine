import { combineReducers } from 'redux';

import filters from './filters';
import flights from './flights';

const rootReducer = combineReducers({ filters, flights });

export default rootReducer;
