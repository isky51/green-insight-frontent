import { configureStore } from '@reduxjs/toolkit';
import authDataReducer from "./auth/authDataSlice";
import homeReducer from "./home/homeSlice";
import { logger } from 'redux-logger';
import dashboardDataReducer from './dashboard/dashboardDataSlice';
import commonDataReducer from './commonData/commonSlice';
import regionDataReducer from './region/regionSlice';
import laneDetailsReducer from './lane/laneDetailsSlice';
import regionOverviewReducer from './region/regionOverviewSlice';
import dashRegionReducer from './dashRegion/dashRegionSlice';

// Array to hold middleware
const middleware: any = [];

// Add logger middleware to the array
middleware.push(logger);

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authDataReducer,
    dashboard: dashboardDataReducer,
    commonData: commonDataReducer,
    region: regionDataReducer,
    regionDash: dashRegionReducer,
    regionOverview: regionOverviewReducer,
    lane : laneDetailsReducer,
    home: homeReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    // Disable checks for immutability and serializability for improved performance
    immutableCheck: false,
    serializableCheck: false
  }).concat(middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { auth: AuthState, dashboard: DashboardState, commonData: CommonState, region: RegionState, home: HomeState }
export type AppDispatch = typeof store.dispatch;

export default store;
