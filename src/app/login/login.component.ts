import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
	AbstractControl
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthService } from '../_services';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	form: FormGroup;
	name_email: AbstractControl;
	password: AbstractControl;

	loading = false;
	submitted = false;
	returnUrl: string;
	errors: string;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private authService: AuthService
	) {
		// redirect to home if already logged in
		if (localStorage.getItem('currentUser')) {
			this.router.navigate(['/']);
		}

		this.form = this.formBuilder.group({
			name_email: ['', Validators.required],
			password: ['', Validators.required]
		});

		this.name_email = this.form.controls['name_email'];
		this.password = this.form.controls['password'];

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	// convenience getter for easy access to form fields
	get f() { return this.form.controls; }

	onSubmit() {
		this.submitted = true;

		// reset alerts on submit
		this.alertService.clear();

		// stop here if form is invalid
		if (this.form.invalid) {
			return;
		}

		this.loading = true;
		this.errors = "";

		let data: any;
		if (this.name_email.value.indexOf('@') === -1){
			data = {name: this.name_email.value, password: this.password.value};
		} else {
			data = {email: this.name_email.value, password: this.password.value};
		}

		this.authService.logIn(data)
			.subscribe(
				data => {
					console.log("FFFFFFF");
					this.router.navigate([this.returnUrl]);
				},
				error => {
					console.log('err:', error);
					let errors = JSON.parse(error["_body"]).errors.join('');
					if (errors.indexOf("Invalid") != -1) {
						this.errors = "Invalid user name or password.";
					} else {
						this.errors = "Please confirm your email before login.";
					}
					this.loading = false;
				}
			);
	}

	ngOnInit() {
	}
}
