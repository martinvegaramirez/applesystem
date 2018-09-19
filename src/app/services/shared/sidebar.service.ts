import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'CUENTA',
      icono: 'mdi mdi-square-inc-cash',
      submenu: [
       { titulo: 'Tu cuenta', url: '/dashboard' },
        { titulo : 'Paquetes/Comisiones', url: '/promesas' },
        { titulo: 'Tus Compras/Servicios', url: '/promesas' },
        { titulo: 'Tu Rentabilidad', url: '/promesas' },
        { titulo: 'Tu Estado de Cuenta', url: '/promesas' }
      ]
    },
    {
      titulo: 'INFORMACION',
      icono: 'mdi mdi-tree',
      submenu: [
        { titulo: 'Tu Información', url: '/promesas' },
         { titulo : 'Tu Arbol', url: '/promesas' },
         { titulo: 'Tus Calificaciones', url: '/promesas' }
       ]
    },
    {
      titulo: 'OTROS SERVICIOS',
      icono: 'mdi mdi-trophy',
      submenu: [
         { titulo: 'Concursos/Premios', url: '/promesas' },
         { titulo: 'Recomiendate', url: '/promesas' },
         { titulo: 'Notificaciones', url: '/promesas' },
         { titulo: 'Soporte', url: '/promesas' },
         { titulo: 'Noticias', url: '/promesas' }
       ]
    }
  ];

  constructor() { }

}
