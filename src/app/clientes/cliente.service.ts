import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';




@Injectable()
export class ClienteService {
  private httpHeaders = new HttpHeaders({'content-Type': 'application/json'})

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';
  constructor(private http: HttpClient, private  router: Router){ }

  public getClientes(): Observable<Cliente[]>{
    //return of (CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  public create(cliente: Cliente): Observable<Cliente>{
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(

      map( (response: any) => response.cliente as Cliente),

      catchError( e =>{
          if(e.status == 400){
            
            return throwError(() => e);
          }

          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e );
        })
    );  
  }

  public getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

 public update(cliente : Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`,cliente, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        
        if(e.status == 400){
          return throwError(() => e);

        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(() => e );
      })
    );

  }

  public delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      
      catchError( e =>{
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(() => e );
        
      })

    );

  }

}
