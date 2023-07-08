import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn:ElementRef; 

  public formSubmitted = false;

  public loginForm:FormGroup = this.fb.group({

    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember:[false]
    
  });

  constructor(
    private router: Router, 
    private fb:FormBuilder,
    private usuarioService: UsuarioService) { }

  ngAfterViewInit(): void {
     this.googleInit();
  }

  googleInit(){

    google.accounts.id.initialize({
      client_id: "501602658824-apk8jv25cdc1n08d485a7pj25maieksc.apps.googleusercontent.com",
      callback: (response:any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
       this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response:any){

    this.usuarioService.loginGoogle(response.credential)
      .subscribe(resp=>{
        this.router.navigateByUrl('/');
      },
      (err)=> console.log(err))

  }

  ngOnInit(): void {}

  login(){

    if(this.loginForm.invalid) return;

    console.log(this.loginForm.value);
    this.usuarioService.loginUsuario(this.loginForm.value)
      .subscribe(
        (res)=>{
          
          if(this.loginForm.get('remember').value){
            localStorage.setItem('email', this.loginForm.get('email').value);
          }else{
            localStorage.removeItem('email');
          }

          this.router.navigateByUrl('/');

        },(err)=> Swal.fire('Error', err.error.msg, 'error'));
 
  }

}
