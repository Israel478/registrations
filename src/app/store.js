import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import registrationsReducer from '../features/registrationsSlice';
import coachesReducer from '../features/coachesSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['registrations', 'coaches'] // Only persist these reducers
};

const rootReducer = combineReducers({
  registrations: registrationsReducer,
  coaches: coachesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
