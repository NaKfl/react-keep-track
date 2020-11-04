import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledBoardDetail = styled.div`
  .columns {
    display: flex;

    & > * {
      width: calc(100% / 3);
    }
  }
`;
