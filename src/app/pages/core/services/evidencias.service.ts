import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { Evidencias } from '../../models/evidencias';

import { environment } from 'src/environment/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EvidenciasService {
  route = `${environment.apiUrl}/evidencias`;

  private _refreshLisPrograma$ = new Subject<Evidencias | null>();

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }
  postEvidencias(Evidencias: Evidencias): Observable<Evidencias> {
    return this.http.post<Evidencias>(`${this.route}/crear`, Evidencias)
      .pipe(
        tap(() => {
          
        }),
        catchError(this.handleErrorService.handleError)
        
      );
  }
  get refreshLis_refreshLisPrograma() {
    return this._refreshLisPrograma$;
  }
  getEvidencias():Observable<Evidencias[]> {
    return this.http.get<Evidencias[]>(`${this.route}/obtener-todas`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
  putPrograma(id:number,result: Evidencias): Observable<Evidencias> {
    return this.http.put<Evidencias>(`${this.route}/actualizar/${id}`, result)
      .pipe(
        tap(() => {
          this._refreshLisPrograma$.next(null);
        }),
        catchError(this.handleErrorService.handleError)
      );
  }
  deletePrograma(id: number) {
    return this.http.delete(`${this.route}/eliminar/${id}`)
      .pipe(
        tap(() => {
          this._refreshLisPrograma$.next;
        }),
        catchError(this.handleErrorService.handleError)
      );
  }

}