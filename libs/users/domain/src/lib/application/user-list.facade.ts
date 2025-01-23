import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { userListActions } from '../+state/user-list/user-list.actions';
import { userListFeature } from '../+state/user-list/user-list.reducer';

@Injectable({ providedIn: 'root' })
export class UserListFacade {
  private store = inject(Store);

  loaded$ = this.store.pipe(select(userListFeature.selectLoaded));
  userList$ = this.store.pipe(select(userListFeature.selectAll));
  selectedUser$ = this.store.pipe(select(userListFeature.selectSelected));
  totalCount$ = this.store.pipe(select(userListFeature.selectTotalCount));
  error$ = this.store.pipe(select(userListFeature.selectError));
  dataTable$ = this.store.pipe(select(userListFeature.selectDataTable));

  load(): void {
    this.store.dispatch(userListActions.loadUserList());
  }
}
