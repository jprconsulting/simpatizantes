import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { Votante } from '../../models/votantes';

import { environment } from 'src/environment/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VotanteService {
  route = `${environment.apiUrl}/votante`;

  private _refreshLisVotante$ = new Subject<Votante | null>();

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }
  postVotante(votante: Votante): Observable<Votante> {
    return this.http.post<Votante>(`${this.route}/agregar_votante`, votante)
      .pipe(
        tap(() => {
          
        }),
        catchError(this.handleErrorService.handleError)
        
      );
  }
  get refreshLis_refreshLisVotante() {
    return this._refreshLisVotante$;
  }
  getVotante():Observable<Votante[]> {
    return this.http.get<Votante[]>(`${this.route}/obtener_votante`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
  putVotante(result: Votante): Observable<Votante> {
    return this.http.put<Votante>(`${this.route}/editar_votante`, result)
      .pipe(
        tap(() => {
          this._refreshLisVotante$.next(null);
        }),
        catchError(this.handleErrorService.handleError)
      );
  }
  deleteVotante(id: number) {
    return this.http.delete(`${this.route}/eliminar_votante/${id}`)
      .pipe(
        tap(() => {
          this._refreshLisVotante$.next;
        }),
        catchError(this.handleErrorService.handleError)
      );
  }

}