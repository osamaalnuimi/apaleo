import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () =>
      import('@apaleo/users/shell').then((m) => m.usersShellRoutes),
  },
  {
    path: '**',
    redirectTo: '/users',
  },
];
