import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { UserListEffects } from './+state/user-list/user-list.effects';
import { userListFeature } from './+state/user-list/user-list.reducer';

export const userListDomainProviders = [
  provideState(userListFeature),
  provideEffects(UserListEffects),
];
