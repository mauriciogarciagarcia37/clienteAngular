import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable()
export class ClienteService {
  private httpHeaders = new HttpHeaders({'content-Type': 'application/json'})

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';
  constructor(private http: HttpClient ){ }

  getClientes(): Observable<Cliente[]>{
    //return of (CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders})  
  }

}
