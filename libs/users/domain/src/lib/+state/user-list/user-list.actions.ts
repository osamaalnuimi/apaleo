import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@apaleo/shared/util-models';

export const userListActions = createActionGroup({
  source: 'UserList',
  events: {
    loadUserList: emptyProps(),
    loadUserListSuccess: props<{ userList: User[]; totalCount: number }>(),
    loadUserListFailure: props<{ error: unknown }>(),
  },
});
