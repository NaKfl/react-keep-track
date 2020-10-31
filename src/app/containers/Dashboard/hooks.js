import useActions from 'hooks/useActions';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ACTION_STATUS } from 'utils/constants';
import { makeSelectDashboardBoards } from './selectors';
import { actions } from './slice';

const useHooks = () => {
  const boards = useSelector(makeSelectDashboardBoards);
  const [{ getBoards }] = useActions(
    [{ getBoards: actions.getBoards }],
    [actions],
  );

  useEffect(() => getBoards(), [getBoards]);

  return {
    handlers: {},
    selectors: {
      boards,
    },
  };
};

export default useHooks;
