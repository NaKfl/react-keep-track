import Column from 'app/components/Column';
import Title from 'app/components/Title';
import React, { memo } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import CreateCardModel from './CreateCardModel';
import EditCardModel from './EditCardModel';
import useHooks, { useMessage } from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledBoardDetail } from './styles';

export const BoardDetail = () => {
  const { id } = useParams();
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors, createModal, editModal } = useHooks(id);
  const {
    showCreateModal,
    showEditModal,
    handleDeleteCard,
    onDragEnd,
  } = handlers;
  const { info, columns } = selectors;

  useMessage();

  const renderBoardDetail = data => {
    return data.map(({ _id, isDeleted, createdAt, ...props }) => (
      <Column
        id={_id}
        showCreateModal={showCreateModal}
        showEditModal={showEditModal}
        key={_id}
        handleDeleteCard={handleDeleteCard}
        {...props}
      ></Column>
    ));
  };

  return (
    <StyledBoardDetail>
      <Title>{`My boards/${info.name}`}</Title>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">{renderBoardDetail(columns)}</div>
        <CreateCardModel {...createModal} />
        <EditCardModel {...editModal} />
      </DragDropContext>
    </StyledBoardDetail>
  );
};

export default memo(BoardDetail);
