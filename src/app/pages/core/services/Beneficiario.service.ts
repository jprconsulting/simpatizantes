import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { Beneficiario } from '../../models/beneficiario';

import { environment } from 'src/environment/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {
  route = `${environment.apiUrl}/Beneficiario`;

  private _refreshLisBeneficiario$ = new Subject<Beneficiario | null>();

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }
  postVotante(beneficiario: Beneficiario): Observable<Beneficiario> {
    return this.http.post<Beneficiario>(`${this.route}/agregar_beneficiario`, beneficiario)
      .pipe(
        tap(() => {
          
        }),
        catchError(this.handleErrorService.handleError)
        
      );
  }
  get refreshLis_refreshLisBeneficiario() {
    return this._refreshLisBeneficiario$;
  }
  getBeneficiario():Observable<Beneficiario[]> {
    return this.http.get<Beneficiario[]>(`${this.route}/obtener_beneficiario`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
  putBeneficiario(result: Beneficiario): Observable<Beneficiario> {
    return this.http.put<Beneficiario>(`${this.route}/editar_beneficiario`, result)
      .pipe(
        tap(() => {
          this._refreshLisBeneficiario$.next(null);
        }),
        catchError(this.handleErrorService.handleError)
      );
  }
  deleteBeneficiario(id: number) {
    return this.http.delete(`${this.route}/eliminar_Beneficiario/${id}`)
      .pipe(
        tap(() => {
          this._refreshLisBeneficiario$.next;
        }),
        catchError(this.handleErrorService.handleError)
      );
  }

}