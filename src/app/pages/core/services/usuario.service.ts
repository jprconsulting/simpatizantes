import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { Usuarios } from '../../models/usuario';
import { environment } from 'src/environment/environment';
import { Injectable } from '@angular/core';
import { Roles } from '../../models/roles';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
    route = `${environment.apiUrl}/usuarios`;
    route2 = `${environment.apiUrl}/rols`;
  private _refreshLisUsuarios$ = new Subject<Usuarios | null>();
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }

  getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.route2}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.route}/obtener-todos`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
  get refreshLis_refreshLisUsuarios() {
    return this._refreshLisUsuarios$;
  }

  postUsuario(Usuario: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(`${this.route}/crear`, Usuario)
      .pipe(
        tap(() => {

        }),
        catchError(this.handleErrorService.handleError)

      );
  }

  putPrograma(id:number,result: Usuarios): Observable<Usuarios> {
    return this.http.put<Usuarios>(`${this.route}/actualizar/${id}`, result)
      .pipe(
        tap(() => {
          this._refreshLisUsuarios$.next(null);
        }),
        catchError(this.handleErrorService.handleError)
      );
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${this.route}/eliminar/${id}`)
      .pipe(
        tap(() => {
          this._refreshLisUsuarios$.next;
        }),
        catchError(this.handleErrorService.handleError)
      );
  }
}
