import React, { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { useParams } from 'react-router-dom';
import saga from './saga';
import useHooks, { useMessage } from './hooks';
import { sliceKey, reducer } from './slice';
import { StyledBoardDetail } from './styles';
import { useLocation } from 'react-router-dom';
import { ACTION_STATUS } from 'utils/constants';
import CreateCardModel from './CreateCardModel';

import Title from 'app/components/Title';
import Column from 'app/components/Column';

export const BoardDetail = () => {
  const { id } = useParams();

  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors, createModal } = useHooks(id);
  const { showCreateModal } = handlers;
  const { data, info } = selectors;
  const {} = createModal;

  const renderBoardDetail = data => {
    return data.map(({ _id, ...props }) => (
      <Column
        id={_id}
        showCreateModal={showCreateModal}
        key={_id}
        Column
        {...props}
      ></Column>
    ));
  };

  return (
    <StyledBoardDetail>
      <Title>{`My boards/${info.name}`}</Title>
      <div className="columns">{renderBoardDetail(data)}</div>
      <CreateCardModel {...createModal} />
    </StyledBoardDetail>
  );
};

export default memo(BoardDetail);
