import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario.model';


import { UsuarioService } from '../services/service.index';
import { Router } from '@angular/router';

import  swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  sponsorExiste: boolean = false;
  sponsorName: string = "Patrocinador";
  
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales( cadenaUno: string, cadenaDos: string) {

    return ( group: FormGroup ) => {

      let pass1 = group.controls[cadenaUno].value;
      let pass2 = group.controls[cadenaDos].value;

      if (pass1 === pass2) {
         return null;
      }

      return {
           sonIguales: true
      };

    };
  }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(Validators.required),
      contrasena2: new FormControl(Validators.required),
      usuario: new FormControl(null, Validators.required),
      sponsor: new FormControl(null, Validators.required),
      validacion: new FormControl(false)
    }, {validators: this.sonIguales('contrasena', 'contrasena2') }  );

    this.forma.setValue({
      nombre: 'Martin Vega',
      correo: 'martin.vega.rami@gmail.com',
      contrasena: '123',
      contrasena2:  '123',
      usuario: 'mvega'
      sponsor: 'mvega',
      validacion: false

    });
  }

  registrarUsuario() {
    if ( this.forma.invalid ) {
      return;
    }
    if ( !this.forma.value.validacion ) {
      swal('Importante', 'Debe de validar si es correcto el nombre de su patrocinador', 'warning');
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.contrasena,
      this.forma.value.usuario,
      this.forma.value.sponsor
    );

    console.log('Ready to register');
    this._usuarioService.crearUsuario(usuario)
        .subscribe( resp => {
            console.log(resp);
            this.router.navigate(['/login']);
        }, error => { 
          swal('Ya existe usuario ', usuario.email, 'error' );
       });
  }

  buscaSponsor() {
    this._usuarioService.buscarSponsor(this.forma.value.sponsor)
    .subscribe( resp => {
      console.log(resp);
      this.forma.value.validacion.disabled = false;
      if ( !resp.sponsorExiste) {
          this.sponsorExiste = resp.sponsorExiste;
          this.sponsorName = resp.sponsorName;
          console.log('Patrocinador OK');
      } else {
        console.log('Patrocinador NO EXISTE');
        swal('No existe patrocinador, verifique de nuevo', this.forma.value.sponsor, 'error' );
      }
    }, error => { 
      swal('No existe sponsor o  patrocinador, verifique de nuevo', this.forma.value.correo, 'error' );
    });

  }

}
