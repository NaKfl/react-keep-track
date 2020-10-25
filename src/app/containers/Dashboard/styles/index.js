import styled from 'styled-components';

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
