import { Injectable } from '@angular/core';
import { formatDate, DatePipe} from '@angular/common';
import { Cliente } from './cliente';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';




@Injectable()
export class ClienteService {
  private httpHeaders = new HttpHeaders({'content-Type': 'application/json'})

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';
  constructor(private http: HttpClient, private  router: Router){ }

  public getClientes(page:  number): Observable<any>{
    //return of (CLIENTES);
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap( (reponse: any) => {
        console.log('ClienteService: tap 1');
        (reponse.content as Cliente[]).forEach( cliente => {
           console.log( cliente.nombre);
        }

        )
      }),
      map((response: any) => {

        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //formatDate(cliente.createAt, 'dd-MMMM-yyyy', 'es')!;
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM') 
          //formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          return cliente;
        });
        return response;

      }),
      tap(reponse => {
        console.log('ClienteService: tap 2');
        (reponse.content as Cliente[]).forEach( cliente => {
           console.log( cliente.nombre);
        }
        
        )
      })
    );
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
