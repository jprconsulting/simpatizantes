import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable} from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { Areasadscripcion } from '../../models/areasadscripcion';
import { environment } from 'src/environment/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AreasadscripcionService {
    route = `${environment.apiUrl}/areas-adscripcion`;
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }

  getAreasadscripcion():Observable<Areasadscripcion[]> {
    return this.http.get<Areasadscripcion[]>(`${this.route}/obtener-todos`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
  
}