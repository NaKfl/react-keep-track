import styled from 'styled-components';
import Modal from '../CreateBoardModal';
import EditModal from '../EditBoardModal';

export const StyledDashboard = styled.div`
  .list {
    & > * {
      width: 50%;
    }
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;

export const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding-bottom: 0;
  }
`;

export const StyledEditModal = styled(EditModal)`
  .ant-modal-body {
    padding-bottom: 0;
  }
`;
