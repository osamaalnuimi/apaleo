import { Component, inject, OnInit } from '@angular/core';
import { UserListFacade } from '@apaleo/users/domain';
import { ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UserListEntryComponent } from '@apaleo/users/ui-user-list-entry';
import { TableSkeletonComponent } from '@apaleo/shared/ui-table-skeleton';
import { MatCardModule } from '@angular/material/card';
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZES,
} from '@apaleo/users/domain';
import { DataLoadStatus } from '@apaleo/shared/util-models';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'users-feature-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [
    UserListEntryComponent,
    TableSkeletonComponent,
    MatCardModule,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  private userListFacade = inject(UserListFacade);
  DEFAULT_PAGE_SIZE = DEFAULT_PAGE_SIZE;
  DEFAULT_PAGE_INDEX = DEFAULT_PAGE_INDEX;
  DEFAULT_OPTIONS_LIMIT = DEFAULT_PAGE_SIZES;
  DataLoadStatus = DataLoadStatus;

  vm$ = combineLatest({
    loaded: this.userListFacade.loaded$,
    error: this.userListFacade.error$,
    totalCount: this.userListFacade.totalCount$,
    dataTable: this.userListFacade.dataTable$,
  });

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.userListFacade.load();
  }
}
