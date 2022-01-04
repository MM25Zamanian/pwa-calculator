import Route from '../types/route.js';

export const routes: Route[] = [
  {
    path: '/',
    name: 'home',
    label: 'Home',
    icon: '',
    show_on_nav: true,
    component: 'page-home',
    action: async () => {
      await import('../pages/page-home.js');
    },
  },
  {
    path: '/about',
    name: 'about',
    label: 'Home',
    icon: '',
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
