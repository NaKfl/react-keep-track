import React, { memo } from 'react';
import { StyledLayout, StyledContent } from './styles';
import AuthHeader from './AuthHeader';
import Footer from './Footer';

export const AuthLayout = ({ children }) => (
  <StyledLayout>
    <AuthHeader />
    <StyledContent>{children}</StyledContent>
    <Footer />
  </StyledLayout>
);

export default memo(AuthLayout);
