import { Injectable } from '@angular/core';
import { Servicio } from '../Model/app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Transaccion } from '../Model/transaccion';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  public servicioUrl = 'http://18.222.64.155:8080/demo/'; // URL to web API
  public servicios: Servicio[] = [];
  public servicio: Servicio;
  public errorMessage: string;
  constructor(private http: HttpClient) { }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
  public getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.servicioUrl + "/servicios").pipe(
      catchError(this.handleError('getServicios', [])));
  }


  public create(servicio: Servicio): Observable<Transaccion> {
    return this.http.post<Transaccion>(this.servicioUrl + "/servicio/create",
      JSON.stringify(servicio), httpOptions).pipe(
        tap((transaccion: Transaccion) => console.log(transaccion.codigo)),
        catchError(this.handleError<Transaccion>('create'))
      );
  }

  public update(servicio: Servicio): Observable<Transaccion> {
    return this.http.put<Transaccion>(this.servicioUrl + "/servicio/update",
      JSON.stringify(servicio), httpOptions).pipe(
        tap((transaccion: Transaccion) => console.log(transaccion.codigo)),
        catchError(this.handleError<Transaccion>('update'))
      );
  }


  public deleteServicio(id: number): Observable<Transaccion> {
    return this.http.delete<Transaccion>(this.servicioUrl + "/servicio/delete/" + id, httpOptions).pipe(tap((transaccion: Transaccion) => console.log(transaccion.codigo)),
      catchError(this.handleError<Transaccion>('deleteHero'))
    )
  }

}
