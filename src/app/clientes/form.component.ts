    import { Component, OnInit } from '@angular/core';
    import { Cliente } from './cliente';
    import {ClienteService} from './cliente.service';
    import {Router, ActivatedRoute} from '@angular/router';
    import swal from 'sweetalert2';
   

    @Component({
      selector: 'app-form',
      templateUrl: './form.component.html'
    })
    export class FormComponent implements OnInit {

    public cliente: Cliente = new Cliente();
    public titulo:string = "Crear Cliente";
    public errores: String[];

      constructor(
      private clienteService: ClienteService,
      private router: Router, 
      private activateedRoute: ActivatedRoute) { }
   

      public ngOnInit(): void {
        this.cargarCliente()
      }

      public cargarCliente(): void {
        this.activateedRoute.params.subscribe( params => {
          let id = params['id']

          if(id){
            this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)

          }

        })
      }

      public create(): void{
        this.clienteService.create(this.cliente)
        .subscribe({
            next: cliente =>{
            this.router.navigate(['/clientes'])
            swal.fire('Nuevo cliente',`El cliente ${cliente.nombre} ha sido creado con exito`, 'success')
            },
            error:err => {
              this.errores = err.error.errors as String[];
              console.error('Codigo del error desde el backend: ' + err.status);
              console.error(err.error.errors);
    
            },
            complete: () => {
              console.log("Completo");
              this.router.navigate(['/clientes']);
            }

          });
      }

    public update(): void{
        this.clienteService.update(this.cliente)
        .subscribe({
          next: json => {
          this.router.navigate(['/clientes'])
          swal.fire('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
        },
        error:err => {
          this.errores = err.error.errors as String[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        },
        complete: () => {
          console.log("Completo");
          this.router.navigate(['/clientes']);
        }
      });
    }
  }