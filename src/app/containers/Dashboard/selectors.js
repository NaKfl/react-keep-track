import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectDashboardState = state => state.dashboard;

export const makeSelectDashboardBoards = createSelector(
  selectDashboardState,
  dashboard => get('boards', dashboard),
);

export const makeSelectDashboardStatusCreate = createSelector(
  selectDashboardState,
  dashboard => get('status.create', dashboard),
);

export const makeSelectDashboardStatusEdit = createSelector(
  selectDashboardState,
  dashboard => get('status.edit', dashboard),
);

export const makeSelectDashboardStatusDelete = createSelector(
  selectDashboardState,
  dashboard => get('status.delete', dashboard),
);

export const makeSelectDashboardStatusGet = createSelector(
  selectDashboardState,
  dashboard => get('status.get', dashboard),
);

export const makeSelectDashboardError = createSelector(
  selectDashboardState,
  dashboard => get('error', dashboard),
);
