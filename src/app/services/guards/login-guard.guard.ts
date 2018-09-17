import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor( 
    public _usuarioService: UsuarioService,
    public router: Router ) {

  }

  canActivate() {
    if ( this._usuarioService.estaLogueado() ) {
      console.log('Paso por el Guard');
      return true;
    } else {
      console.log('Bloqueado por el Guard');
      swal('No se tiene permisos', this._usuarioService.usuario.email , 'error' );
      this.router.navigate(['/login']);
      return false;
    }
     
  }
}
