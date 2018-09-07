import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { 
    console.log('Servicio de usuario listo');
  }
}
