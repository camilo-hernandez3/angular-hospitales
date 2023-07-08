import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';

import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private router:Router) { }

  logout(){
    localStorage.removeItem('token');
    
    google.accounts.id.revoke('ah4602118@gmail.com',()=>{
      this.router.navigateByUrl('/login');
    });
  }

  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token') ||'';

    return this.http.get(`${baseUrl}/login/renew`,{
      headers:{
        'x-token':token
      }
    })
    .pipe(
      tap(resp=> {
        localStorage.setItem('token', resp['token'])
      }),
      map(resp=> true),
      catchError(err=> of(false))
    );

  }

  crearUsuario(formData:RegisterForm) {

    return this.http.post(`${baseUrl}/usuarios`, formData)
      .pipe(
        tap(resp=> {
          localStorage.setItem('token', resp['token']);
        })
      );

  }

  loginUsuario(formData:LoginForm){
    return this.http.post(`${baseUrl}/login`, formData)
      .pipe(
        tap(resp=> {
          localStorage.setItem('token', resp['token']);
        })
      );
  }

  loginGoogle(token:string){

    return this.http.post(`${baseUrl}/login/google`, {token})
      .pipe(
        tap(resp=> {
          localStorage.setItem('token', resp['token']);
        })
      )

  }


}
