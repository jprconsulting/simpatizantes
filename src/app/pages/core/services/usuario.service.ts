import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { Usuarios } from '../../models/usuario';
import { environment } from 'src/environment/environment';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
    route = `${environment.apiUrl}/usuarios`;
  private _refreshLisMunicipios$ = new Subject<Usuarios | null>();
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }
  get refreshLis_refreshLisMunicipios() {
    return this._refreshLisMunicipios$;
  }
  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.route}/obtener-todos`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
