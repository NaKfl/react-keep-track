import styled from 'styled-components';
import { FileAddFilled } from '@ant-design/icons';
import { COLOR } from 'styles/colorPalette';

export const StyledAddBoardButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: calc(100% / 6 - 20px);
  min-width: 145px;
  height: 145px;
  margin: 10px;

  border: 2px dashed ${COLOR.GRAY};

  cursor: pointer;

  &:hover {
    border-color: ${COLOR.SECONDARY};
  }
`;

export const StyledAddBoardIcon = styled(FileAddFilled)`
  color: ${COLOR.SECONDARY};
  font-size: 50px;
`;

export const StyledAddBoardTitle = styled.p`
  color: ${COLOR.SECONDARY};
  font-size: 13px;
  font-weight: 700;
  margin: 5px 0 0 0;
`;
