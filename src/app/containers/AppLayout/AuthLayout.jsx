import React, { memo } from 'react';
import { StyledLayout, StyledContent } from './styles';
import AuthHeader from './AuthHeader';
import Header from './Header';
import Footer from './Footer';
import { isAuthenticated } from 'utils/localStorageUtils';

export const AuthLayout = ({ children }) => (
  <StyledLayout>
    {isAuthenticated() ? <Header /> : <AuthHeader />}
    <StyledContent>{children}</StyledContent>
    <Footer />
  </StyledLayout>
);

export default memo(AuthLayout);
