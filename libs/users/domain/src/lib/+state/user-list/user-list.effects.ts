import { inject, Injectable } from '@angular/core';
import { ApiResponseHandlerService } from '@apaleo/shared/util-api-response-handler-service';
import { UsersResponse } from '@apaleo/shared/util-models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { UserListDataService } from '../../infrastructure/user-list.data.service';
import { userListActions } from './user-list.actions';

@Injectable()
export class UserListEffects {
  private actions$ = inject(Actions);
  private userListDataService = inject(UserListDataService);
  private apiHandlingService = inject(ApiResponseHandlerService);

  loadUserList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userListActions.loadUserList),
      switchMap((action) =>
        this.userListDataService.load().pipe(
          this.apiHandlingService.handleResponse({
            successAction: (usersResponse: UsersResponse) =>
              userListActions.loadUserListSuccess({
                totalCount: usersResponse.users.length, // Todo:Replace with actual count
                userList: usersResponse.users,
              }),
            failureAction: userListActions.loadUserListFailure,
            successMessage: 'Users loaded successfully',
            originalAction: action,
          })
        )
      )
    )
  );
}
