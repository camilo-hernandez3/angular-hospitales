import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm:FormGroup = this.fb.group({
    nombre: ['Camilo', [Validators.required, Validators.minLength(3)]],
    email: ['test100@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(3)]],
    password2: ['', [Validators.required, Validators.minLength(3)]],
    terminos: [false, [Validators.requiredTrue]]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(
      private fb: FormBuilder, 
      private usuarioService: UsuarioService,
      private router:Router) { }


  ngOnInit(): void {
  }

  crearUsuario(){
    this.formSubmitted = true;
   
    if(this.registerForm.invalid) return;

    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp=> {
        this.router.navigateByUrl('/');
      },
      (error)=>{Swal.fire('Error', error.error.msg, 'error')});
    
  }

  campoNoValido(campo:string):boolean{

    if(this.registerForm.get(campo).invalid  && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  contrasenasNoValidas(){
      const pas1 = this.registerForm.get('password').value;
      const pas2 = this.registerForm.get('password2').value;

      if((pas1 !== pas2) && this.formSubmitted){
        return true;
      }else{
        return false;
      }

  }

  passwordsIguales(pass1Name: string, pass2Name: string){

    return (formGroud: FormGroup)=>{

      const pass1Control = formGroud.get(pass1Name);
      const pass2Control = formGroud.get(pass2Name);

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({noEsIgual: true});
      }

    }

  }

}
