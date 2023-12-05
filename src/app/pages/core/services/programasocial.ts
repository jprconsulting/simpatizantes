import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { Prograsmasocial } from '../../models/roles';

import { environment } from 'src/environment/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {
  route = `${environment.apiUrl}/programas-sociales`;

  private _refreshLisPrograma$ = new Subject<Prograsmasocial | null>();

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }
  postPrograma(Prograsmasocial: Prograsmasocial): Observable<Prograsmasocial> {
    return this.http.post<Prograsmasocial>(`${this.route}`, Prograsmasocial)
      .pipe(
        tap(() => {
          
        }),
        catchError(this.handleErrorService.handleError)
        
      );
  }
  get refreshLis_refreshLisPrograma() {
    return this._refreshLisPrograma$;
  }
  getPrograma():Observable<Prograsmasocial[]> {
    return this.http.get<Prograsmasocial[]>(`${this.route}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
  putPrograma(result: Prograsmasocial): Observable<Prograsmasocial> {
    return this.http.put<Prograsmasocial>(`${this.route}`, result)
      .pipe(
        tap(() => {
          this._refreshLisPrograma$.next(null);
        }),
        catchError(this.handleErrorService.handleError)
      );
  }
  deletePrograma(id: number) {
    return this.http.delete(`${this.route}/eliminar_Beneficiario/${id}`)
      .pipe(
        tap(() => {
          this._refreshLisPrograma$.next;
        }),
        catchError(this.handleErrorService.handleError)
      );
  }

}