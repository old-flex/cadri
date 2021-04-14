
const routes = [
  {
    path: '/',
    component: () => import('../pages/MainPage'),
  },
  {
    path: '/reportCard',
    name: 'reportCard',
    component: () => import('pages/Reports/ReportCard')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login')
  },
  {
    path: '/editCard',
    name: 'editCard',
    component: () => import('pages/Reports/EditReport')
  },
  {
    path: '/vacationSchedule',
    name: 'vacations',
    component: () => import('../pages/VacationSchedule')
  },
  {
    path: '/vacationCreate',
    name: 'vacationCreate',
    component: () => import('../pages/VacationCard')
  },
  {
    path: '/createReport',
    name: 'createReport',
    component: () => import('../pages/Reports/NewReport')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
