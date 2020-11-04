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

export {
  makeSelectBoardDetailError,
  makeSelectBoardDetailData,
  makeSelectBoardDetailInfo,
};
