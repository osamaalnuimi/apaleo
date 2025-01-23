import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-ui-table-skeleton',
  templateUrl: './table-skeleton.component.html',
  styleUrl: './table-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSkeletonComponent {}
