import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectDashboardState = state => state.dashboard;

export const makeSelectDashboardBoards = createSelector(
  selectDashboardState,
  dashboard => get('boards', dashboard),
);

export const makeSelectDashboardStatus = createSelector(
  selectDashboardState,
  dashboard => get('status', dashboard),
);

export const makeSelectDashboardError = createSelector(
  selectDashboardState,
  dashboard => get('error', dashboard),
);
