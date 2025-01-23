import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  untracked,
  viewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Subject, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserDataTable } from '@apaleo/shared/util-models';
import { AddressPipe } from '@apaleo/shared/util-address-pipe';

@Component({
  selector: 'user-list-entry',
  imports: [
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    AddressPipe,
  ],
  templateUrl: './user-list-entry.component.html',
  styleUrl: './user-list-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListEntryComponent {
  paginator = viewChild.required<MatPaginator>(MatPaginator);
  sort = viewChild.required<MatSort>(MatSort);
  table = viewChild.required<MatTable<UserDataTable>>(MatTable);

  pageIndex = input.required<number>();
  pageSize = input.required<number>();
  pageSizeOptions = input.required<number[]>();
  totalCount = input<number>();
  userList = input<UserDataTable[]>();

  displayedColumns = ['firstName', 'lastName', 'age', 'address'];
  dataSource: MatTableDataSource<UserDataTable> = new MatTableDataSource();
  private searchSubject = new Subject<string>();

  constructor() {
    effect(() => {
      const userList = this.userList();
      if (userList && userList.length > 0) {
        untracked(() => {
          this.dataSource.data = userList;
          this.dataSource.sort = this.sort();
          this.dataSource.paginator = this.paginator();
        });
      }
    });
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((searchValue) => this.applyFilter(searchValue)),
        takeUntilDestroyed()
      )
      .subscribe();
  }
  onSearchInput(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchValue);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data: UserDataTable, filter: string) => {
      const searchStr = (data.firstName + data.lastName).toLowerCase();
      return searchStr.indexOf(filter.toLowerCase()) !== -1;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
