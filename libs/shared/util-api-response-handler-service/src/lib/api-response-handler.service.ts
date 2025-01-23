import { inject, Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ApiResponseHandlerService {
  private _snackBar = inject(MatSnackBar);
  private _store = inject(Store);

  /**
   * Creates a response handling operator that can be used in effects
   */
  handleResponse<T, R>(config: {
    successAction: (result: R) => Action;
    failureAction: (error: any) => Action;
    successMessage?: string;
    originalAction: Action;
  }) {
    return (source: Observable<T>) =>
      source.pipe(
        map((response: any) => {
          if (config.successMessage) {
            this._snackBar.open(config.successMessage, 'Close', {
              duration: 5000,
              panelClass: ['success-snackbar'],
            });
          }
          return config.successAction(response);
        }),

        catchError((error) => {
          console.error(error);
          this._snackBar
            .open(String(error), 'Retry', {
              duration: 10000,
              panelClass: ['error-snackbar'],
            })
            .onAction()
            .subscribe(() => {
              this.retryAction(config.originalAction);
            });
          return of(config.failureAction(error));
        })
      );
  }

  retryAction(action: Action) {
    this._store.dispatch(action);
  }
}
