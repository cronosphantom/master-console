import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';

// Pages
import Dashboard from '@/pages/Dashboard/Dashboard';
import Feedback from '@/pages/Feedback/Feedback'
import Users from '@/pages/Users/Users'
import Notifications from '@/pages/Notifications/Notifications'
import Icons from '@/pages/Icons/Icons'
import Charts from '@/pages/Charts/Charts'
import Maps from '@/pages/Maps/Google'
import Error from "@/pages/Error/Error";
import Login from "@/pages/Login/Login";
import ThemeList from '@/pages/ThemeList/ThemeList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
    path: '/',
    redirect: 'login',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: Feedback,
      },
      {
        path: 'users',
        name: 'Users',
        component: Users
      },
      {
        path: 'lists',
        name: 'Theme List',
        component: ThemeList
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'charts',
        name: 'Charts',
        component: Charts
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
    ],
  },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ],
});
