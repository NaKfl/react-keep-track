import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledColumnTitle = styled.p`
  margin: 0;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 18px;
  &:before {
    content: '';
    display: inline-block;
    height: 15px;
    width: 15px;
    background-color: ${({ color }) => (color ? color : COLOR.SECONDARY)};
    border-radius: 3px;
    margin-right: 5px;
    transform: translateY(1px);
  }
`;

export const StyledAddButton = styled.div`
  color: ${COLOR.GRAY_5};
  background-color: ${COLOR.GRAY_D};
  font-weight: bold;
  font-size: 19px;
  text-align: center;
  border-radius: 2px;
  margin-bottom: -7px;
  transition: ease 0.3s;

  &:hover {
    background-color: ${COLOR.GRAY};
  }
`;

export const StyledColumn = styled.div`
  margin: 0 10px;

  .cards {
    & > * {
      display: flex;
      flex-direction: column;
      margin-top: 15px;
    }
  }
`;
