import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import userReducer from './slices/users';
import teamReducer from './slices/teams';
import dashboardReducer from './slices/dashboard';
import orderReducer from './slices/orders';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  user: userReducer,
  team: teamReducer,
  dashboard: dashboardReducer,
  order: orderReducer,
});

export { rootPersistConfig, rootReducer };
