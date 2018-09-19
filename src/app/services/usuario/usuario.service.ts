import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import  swal from 'sweetalert';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  usuarioExiste: boolean = false;
  usuarioTmp: Usuario;
  sponsorExiste: boolean = false;
  sponsors: Usuario[] = [];
  sponsorName: string = "Valide Nombre del Patrocinador";
  sponsorAlias: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
     this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + 'login/renuevatoken';
    url += '?token=' + this.token;
   return  this.http.get(url)
              .map( (resp: any) => {

                this.token = resp.token;
                localStorage.setItem('token', this.token);
                return true;
              }).catch( err => {
                this.router.navigate(['/login']);
                swal('No se pudo renovar token', 'No fue posible renovar token', 'error');
                return Observable.throw( err );
              });

  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;

  }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
       this.token = '';
       this.usuario = null;
    }
  }

  guardarStorage(id: string, token:string, usuario: Usuario){

      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario) )
       this.token = token;
       this.usuario = usuario;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
    
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email',usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + 'login';
    return this.http.post( url, usuario)
              .map( (resp: any)  => {
                this.guardarStorage(resp.id, resp.token, resp.usuario);
                return true;
              });

  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + 'usuario';

    return this.http.post( url, usuario)
            .map( (resp: any) => {
              swal('Usuario creado', usuario.email, 'success' );
                return resp.usuario;
            });

  }

  buscarUsuario( termino: string ) {

    let url = URL_SERVICIOS + 'busqueda/coleccion/usuario/' + termino;

    this.http.get( url )
        .subscribe( (resp: any) => {

          console.log( resp );
          this.usuarioTmp = resp.usuario;
          this.usuarioExiste = true;
        });

  }

  buscarSponsor( termino: string ) {

    this.sponsorExiste = false;
    this.sponsorName = 'No existe patrocinador';
    let url = URL_SERVICIOS + 'busqueda/coleccion/usuario/' + termino;

    this.http.get( url )
        .subscribe( (resp: any) => {

          console.log( resp );
          this.sponsors = resp.usuario;
          
          for (let i=0; i<this.sponsors.length; i++) {
              if (this.sponsors[i].usuario === termino) {
               this.sponsorExiste = true;
               this.sponsorName = this.sponsors[i].nombre;
             }
          }
          this.sponsors.forEach(row => {
             
            
          });

          if (!this.sponsorExiste) {
            swal('Intente de nuevo', this.sponsorName, 'warning' );
          }

        });

  }


}
