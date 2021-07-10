import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/interface';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = environment.baseUrl;
  private _user!: User;

  get user(){
    console.log(this._user);
    return {...this._user};
  }

  constructor( private http: HttpClient ) { }

  register( name: string, email: string, password: string ){

    const url = `${this.baseUrl}auth/new`;

    const body = { name, email, password };

    return this.http.post<AuthResponse>( url, body )
            .pipe(
              tap( resp => {
                console.log(resp);
                if(resp.ok){
                  localStorage.setItem('token', resp.token!)
                }
              }),
              map( resp => resp.ok ),
              catchError( err => of(err.error.msg) )
            )

  }

  login( email: string, password: string ){

    const url = `${this.baseUrl}auth/`;

    const body = { email, password };

    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( resp =>{
          if(resp.ok){
            localStorage.setItem('token', resp.token!)
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );

  }

  validateToken(){

    const url = `${this.baseUrl}auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>( url, { headers: headers } )
            .pipe(
              map( resp => {
                  localStorage.setItem('token', resp.token!)
                  this._user = {
                    name: resp.name!,
                    email: resp.email!,
                    uid : resp.uid!
                }
                return resp.ok;
              }),
              catchError( err => of(false) )
            )


  }

  logOut(){

    localStorage.clear();

  }


}
