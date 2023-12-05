import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { Municipios } from '../../models/municipios';
import { environment } from 'src/environment/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {
    route = `${environment.apiUrl}/municipios`;

  private _refreshLisMunicipios$ = new Subject<Municipios | null>();

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }
  get refreshLis_refreshLisMunicipios() {
    return this._refreshLisMunicipios$;
  }
  getMunicipios():Observable<Municipios[]> {
    return this.http.get<Municipios[]>(`${this.route}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
  
}