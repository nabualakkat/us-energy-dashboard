import { combineReducers } from 'redux';

import alert from './alert';
import data from './data';
import theme from './theme';

export default combineReducers({ alert, data, theme });
