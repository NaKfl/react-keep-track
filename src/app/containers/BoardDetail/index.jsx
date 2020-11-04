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
import EditCardModel from './EditCardModel';

import Title from 'app/components/Title';
import Column from 'app/components/Column';

export const BoardDetail = () => {
  const { id } = useParams();

  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors, createModal, editModal } = useHooks(id);
  const { showCreateModal, showEditModal, handleDeleteCard } = handlers;
  const { data, info } = selectors;
  const {} = createModal;

  const renderBoardDetail = data => {
    return data.map(({ _id, ...props }) => (
      <Column
        id={_id}
        showCreateModal={showCreateModal}
        showEditModal={showEditModal}
        key={_id}
        Column
        handleDeleteCard={handleDeleteCard}
        {...props}
      ></Column>
    ));
  };

  return (
    <StyledBoardDetail>
      <Title>{`My boards/${info.name}`}</Title>
      <div className="columns">{renderBoardDetail(data)}</div>
      <CreateCardModel {...createModal} />
      <EditCardModel {...editModal} />
    </StyledBoardDetail>
  );
};

export default memo(BoardDetail);
