import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

const selectBoardDetailState = state => state.boardDetail;

const makeSelectBoardDetailData = createSelector(
  selectBoardDetailState,
  boardDetail => get('data', boardDetail),
);

const makeSelectBoardDetailInfo = createSelector(
  selectBoardDetailState,
  boardDetail => get('info', boardDetail),
);

const makeSelectBoardDetailError = createSelector(
  selectBoardDetailState,
  boardDetail => get('error', boardDetail),
);

const makeSelectBoardDetailStatusCreate = createSelector(
  selectBoardDetailState,
  boardDetail => get('status.createCard', boardDetail),
);

const makeSelectBoardDetailStatusEdit = createSelector(
  selectBoardDetailState,
  boardDetail => get('status.editCard', boardDetail),
);

const makeSelectBoardDetailStatusDelete = createSelector(
  selectBoardDetailState,
  boardDetail => get('status.deleteCard', boardDetail),
);

export {
  makeSelectBoardDetailError,
  makeSelectBoardDetailData,
  makeSelectBoardDetailInfo,
  makeSelectBoardDetailStatusCreate,
  makeSelectBoardDetailStatusEdit,
  makeSelectBoardDetailStatusDelete,
};
