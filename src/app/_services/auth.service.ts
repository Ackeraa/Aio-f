import { Injectable, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { BehaviorSubject, Observable, AsyncSubject } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators'; 

@Injectable()
export class AuthService implements OnInit{

	public user$: BehaviorSubject<any> = new BehaviorSubject(null);
	
	constructor(public tokenService: Angular2TokenService) {
		this.getUserInfo();
	}

	register(data: {name: string, email:string, password:string, passwordConfirmation:string}):
		Observable<Response>{
		return this.tokenService.registerAccount(data)
			.pipe(map(res => res.json()));
	}

	logIn(data):Observable<Response>{
		return this.tokenService.post('auth/sign_in', data)
			.pipe(map(res => {
				let user = res.json().data;
				this.user$.next({
					user_id: user.id,
					user_name: user.name,
					user_role: user.role
				});
				return res.json();
			}));
	}

	logOut():Observable<Response>{
		return this.tokenService.signOut()
		   .pipe(map(res => {
				this.user$.next(null);
				return res;
			}));
	}

	getUserInfo(): void {
		this.tokenService.validateToken().subscribe(
			res => {
				if (res.status == 200){
					let user = res.json().data;
					this.user$.next({
						user_id: user.id,
						user_name: user.name,
						user_role: user.role
					});
				} else {
					this.user$.next(null);
				}
			},
		);
	}

	updatePassword(data: any): Observable<any> {
		return this.tokenService.updatePassword(data)
			.pipe(map(res => res.json()));
	}

	get(url: string, params: any = null): Observable<any> {
		if (params == null) {
			return this.tokenService.get(url)
				.pipe(map(res => res.json()));
		} else {
			let new_params = { search: params };
			return this.tokenService.get(url, new_params)
				.pipe(map(res => res.json()));
		}
	}

	post(url: string, body: any): Observable<any> {
		return this.tokenService.post(url, body)
				.pipe(map(res => res.json()));
	}

	put(url: string, body: any): Observable<any> {
		return this.tokenService.put(url, body)
				.pipe(map(res => res.json()));
	}

	delete(url: string, body: any = null): Observable<any> {
		return this.tokenService.delete(url, body)
				.pipe(map(res => res.json()));
	}

	ngOnInit(): void {
	}
}
