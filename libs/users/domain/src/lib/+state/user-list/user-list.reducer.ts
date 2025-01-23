import { createReducer, on, createFeature, createSelector } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { userListActions } from './user-list.actions';
import {
  User,
  DataLoadStatus,
  UserDataTable,
} from '@apaleo/shared/util-models';

export interface TransientState {
  selectedId: number | undefined;
  loaded: DataLoadStatus;
  error: unknown | undefined;
  totalCount: number;
}

const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState = adapter.getInitialState<TransientState>({
  loaded: DataLoadStatus.INITIAL,
  selectedId: undefined,
  error: undefined,
  totalCount: 0,
});

export const userListFeature = createFeature({
  name: 'userList',
  reducer: createReducer(
    initialState,
    on(userListActions.loadUserList, (state) => ({
      ...state,
      loaded: DataLoadStatus.LOADING,
      error: null,
    })),
    on(userListActions.loadUserListSuccess, (state, action) =>
      adapter.setAll(action.userList, {
        ...state,
        loaded: DataLoadStatus.LOADED,
        totalCount: action.totalCount,
      })
    ),
    on(userListActions.loadUserListFailure, (state, action) => ({
      ...state,
      error: action.error,
      loaded: DataLoadStatus.ERROR,
    }))
  ),
  extraSelectors: (
    { selectUserListState, selectSelectedId },
    selectors = adapter.getSelectors(selectUserListState)
  ) => ({
    selectAll: selectors.selectAll,
    selectDataTable: createSelector(selectors.selectAll, (all) =>
      all.map(
        (e) =>
          ({
            firstName: e.firstName,
            lastName: e.lastName,
            age: e.age,
            address: e.address,
          } as UserDataTable)
      )
    ),
    selectSelected: createSelector(
      selectors.selectAll,
      selectSelectedId,
      (all, id) => all.find((e) => e.id === id)
    ),
  }),
});
