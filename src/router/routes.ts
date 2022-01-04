import Route from '../types/route.js';

export const routes: Route[] = [
  {
    path: '/',
    name: 'home',
    label: 'Home',
    icon: 'home',
    show_on_nav: true,
    component: 'page-home',
    action: async () => {
      await import('../pages/page-home.js');
    },
  },
  {
    path: '/calculator',
    name: 'calc',
    label: 'Calculator',
    icon: 'calculate',
    show_on_nav: true,
    component: 'page-calculator',
    action: async () => {
      await import('../pages/page-calculator.js');
    },
  },
  {
    path: '/about',
    name: 'about',
    label: 'About Us',
    icon: 'info',
    show_on_nav: true,
    component: 'page-about',
    action: async () => {
      await import('../pages/page-about.js');
    },
  },
  {
    path: '(.*)',
    name: 'not-found',
    component: 'page-not-found',
    action: async () => {
      await import('../pages/page-not-found.js');
    },
  },
];
