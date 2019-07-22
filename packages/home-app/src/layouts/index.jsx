import React from 'react';
import AuthLayout from './AuthLayout';
import DashboardLayout from './DashboardLayout';

// eslint-disable-next-line react/display-name
const composeLayout = Layout => (Component, props) => matchProps => (
  <Layout {...matchProps} {...props} Component={Component} />
);

export const composeAuthLayout = composeLayout(AuthLayout);
export const composeDashboardLayout = composeLayout(DashboardLayout);

export default composeLayout;
