import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import  Swal  from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  miForm: FormGroup = this.fb.group({
    email    :['test2@test.com', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password :['987654', [Validators.required, Validators.minLength(6)]]
  })

  constructor( private fb:FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  ngOnInit(): void {
  }

  login(){

    

    const { email, password } = this.miForm.value;

    this.authService.login( email, password )
      .subscribe( ok => {
        console.log(ok);
        if(ok===true){
          this.router.navigateByUrl('/dashboard');
        }else{
          Swal.fire( 'Error', ok, 'error' )
        }
      });

    
  }

}
