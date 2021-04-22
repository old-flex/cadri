
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
    path: '/editCard/:id',
    name: 'editCard',
    component: () => import('pages/Reports/EditReport')
  },
  {
    path: '/vacationSchedule',
    name: 'vacations',
    component: () => import('pages/Vacations/VacationSchedule')
  },
  {
    path: '/vacationCreate',
    name: 'vacationCreate',
    component: () => import('pages/Vacations/VacationCard')
  },
  {
    path: '/createReport',
    name: 'createReport',
    component: () => import('../pages/Reports/NewReport')
  },
  {
    path:'/createVacationCard',
    name: 'createVacationCard',
    component: () => import('../pages/Vacations/NewVacationCard')
  },
  {
    path: '/editVacation/:id',
    name: 'editVacation',
    component: () => import('../pages/Vacations/EditVacation')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
