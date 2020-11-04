import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledCard = styled.div`
  background-color: ${({ color }) => (color ? color : COLOR.SECONDARY)};
  color: ${COLOR.WHITE};
  min-height: 55px;
  padding: 10px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  font-size: 15px;
  cursor: grab;
`;
