import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersResponse } from '@apaleo/shared/util-models';

import { APP_CONFIG } from '@apaleo/shared/util-app-config';

@Injectable({
  providedIn: 'root',
})
export class UserListDataService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);
  load(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.config.apiUrl}/users`);
  }
}
