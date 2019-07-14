import { Injectable } from '@angular/core';
import { Usuario } from '../Model/usuario';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuardService  implements CanActivate{
  usuario: Usuario;
  constructor(private router: Router) { }
  canActivate() {
    this.usuario = new Usuario();
    this.usuario.token = sessionStorage.getItem('token');
    if (sessionStorage.getItem('token') != null) {
      console.log("token:", sessionStorage.getItem('token'));
      return true
    } else {
      console.log("no hay token");
      this.router.navigate(['/mlogin']);
      return false;
    }
  }


}
