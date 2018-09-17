import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import  swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  err: boolean = true;
  constructor( 
    public router: Router,
    public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email' || '' );
    if ( this.email.length != null ) {
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }
    
    let usuario = new Usuario(null, forma.value.email, forma.value.password, null, null);
    this._usuarioService.login(usuario, forma.value.recuerdame)
            .subscribe( resp => {
                this.err = false;
                this.router.navigate(['/dashboard']);
            }, error => { 
              swal('No existe usuario o no es correcta la contraseña', usuario.email, 'error' );
           });



  }

}
