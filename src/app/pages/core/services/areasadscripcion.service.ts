import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, Subject} from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { Areasadscripcion } from '../../models/areasadscripcion';
import { environment } from 'src/environment/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AreasadscripcionService {
    route = `${environment.apiUrl}/areas-adscripcion`;
    private _refreshLisAreasadscripcion = new Subject<Areasadscripcion | null>();
  constructor(
    private http: HttpClient,

    private handleErrorService: HandleErrorService
  ) { }

  getAreasadscripcion():Observable<Areasadscripcion[]> {
    return this.http.get<Areasadscripcion[]>(`${this.route}/obtener-todos`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  postArea(Areasadscripcion: Areasadscripcion): Observable<Areasadscripcion> {
    return this.http.post<Areasadscripcion>(`${this.route}/crear`, Areasadscripcion)
      .pipe(
        tap(() => {

        }),
        catchError(this.handleErrorService.handleError)

      );
  }
  get refreshLis_refreshLisAreasadscripcion() {
    return this._refreshLisAreasadscripcion;
  }

  putArea(id:number,result: Areasadscripcion): Observable<Areasadscripcion> {
    return this.http.put<Areasadscripcion>(`${this.route}/actualizar/${id}`, result)
      .pipe(
        tap(() => {
          this._refreshLisAreasadscripcion.next(null);
        }),
        catchError(this.handleErrorService.handleError)
      );
  }

  deleteArea(id: number) {
    return this.http.delete(`${this.route}/eliminar/${id}`)
      .pipe(
        tap(() => {
          this._refreshLisAreasadscripcion.next;
        }),
        catchError(this.handleErrorService.handleError)
      );
  }

}
