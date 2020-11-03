import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
import { Card } from 'antd';

export const StyledBoard = styled(Card)`
  max-width: calc(100% / 6 - 20px);
  min-width: 145px;
  height: 145px;
  box-shadow: 0 2px 4px 0 rgba(192, 208, 230, 0.5);

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

  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08),
      0 2px 10px 0 rgba(0, 0, 0, 0.06);
  }
`;
