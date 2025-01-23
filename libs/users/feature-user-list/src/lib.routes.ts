import { Routes } from '@angular/router';

export const userListManageRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./lib/user-list.component').then((m) => m.UserListComponent),
  },
];
