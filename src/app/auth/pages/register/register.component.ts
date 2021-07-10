import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  miRegisterForm: FormGroup = this.fb.group({
    name: ['test3', [ Validators.required ]],
    email: ['test3@test.com', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['987654', [Validators.required]]
  })

  ngOnInit(): void {
  }

  register(){
    
    const { name, email, password } = this.miRegisterForm.value;

    this.authService.register( name, email, password )
      .subscribe( ok => {
        console.log(ok);
        if(ok===true){
          this.router.navigateByUrl('/dashboard');
        }else{
          Swal.fire( 'Error', ok, 'error' )
        }
      })

  }

}
