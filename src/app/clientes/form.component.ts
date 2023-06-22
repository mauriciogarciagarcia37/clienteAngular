    import { Component, OnInit } from '@angular/core';
    import { Cliente } from './cliente';
    import {ClienteService} from './cliente.service';
    import {Router, ActivatedRoute} from '@angular/router';
    import swal from 'sweetalert2';
import { Observable } from 'rxjs';

    @Component({
      selector: 'app-form',
      templateUrl: './form.component.html'
    })
    export class FormComponent implements OnInit {

    public cliente: Cliente = new Cliente();
    public titulo:string = "Crear Cliente";

      constructor(private clienteService: ClienteService,
      private router: Router, 
      private activateedRoute: ActivatedRoute) { }

      ngOnInit(): void {
        this.cargarCliente()
      }

      cargarCliente(): void {
        this.activateedRoute.params.subscribe( params => {
          let id = params['id']

          if(id){
            this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)

          }

        })
      }

      public create(): void{
        this.clienteService.create(this.cliente).subscribe(
          cliente =>{
            this.router.navigate(['/clientes'])
            swal.fire('Nuevo cliente',`Cliente ${cliente.nombre} creado con exito`, 'success')
          }
        );
      }

      update(): void{
        this.clienteService.update(this.cliente)
        .subscribe( cliente => {
          this.router.navigate(['/clientes'])
          swal.fire('Cliente Actulizado', `Cliente ${cliente.nombre} actualizado con exito!`, 'success')
        })
      }

     
    }
