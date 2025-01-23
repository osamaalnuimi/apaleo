import { Routes } from '@angular/router';
import { userListDomainProviders } from '@apaleo/users/domain';

export const usersShellRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./lib/shell.component').then((m) => m.ShellComponent),
    providers: [...userListDomainProviders],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@apaleo/users/feature-user-list').then(
            (m) => m.userListManageRoutes
          ),
      },
    ],
  },
];
