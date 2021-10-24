

import React from 'react'
const Login = React.lazy(() => import('pages/Login/index'));
const Layout = React.lazy(() => import('pages/Layout/index'));

const routes = [
  // 重定
  {
    path: '/',
    to: '/login',
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: false
  },
  {
    path: '/layout',
    component: Layout,
    exact: false
  }
]

export default routes