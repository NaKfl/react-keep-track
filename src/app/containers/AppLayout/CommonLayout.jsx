import React, { memo } from 'react';
import { StyledLayout, StyledContent } from './styles';
import Header from './Header';
import Footer from './Footer';

export const CommonLayout = ({ children }) => (
  <StyledLayout>
    <Header />
    <StyledContent>{children}</StyledContent>
    <Footer />
  </StyledLayout>
);

export default memo(CommonLayout);
