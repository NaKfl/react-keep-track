import styled from 'styled-components';
import Modal from '../CreateBoardModal';

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
