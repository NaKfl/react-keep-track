import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
import { Card } from 'antd';

export const StyledBoard = styled(Card)`
  max-width: calc(100% / 6 - 20px);
  min-width: 145px;
  height: 145px;

  margin: 10px;
  .description {
    display: flex;
    align-items: center;
    .time {
      margin-left: 5px;
    }
  }

  .ant-card-actions {
    li span span svg {
      color: ${COLOR.SECONDARY};
    }
  }
`;
