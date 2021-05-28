import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
	AbstractControl
} from '@angular/forms';

@Component({
	selector: 'app-user-general-settings',
	templateUrl: './general-settings.component.html',
	styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {

    form: FormGroup;
	name: AbstractControl;
	email: AbstractControl; 
	password: AbstractControl;
	password_confirmation: AbstractControl;

    loading = false;
    submitted = false;
	name_exists = false;
	email_exists = false;

    constructor(private formBuilder: FormBuilder,
				private userService: UserService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.compose([
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(10),
				this.nameValidator])],
            email: ['', Validators.compose([
				Validators.required,
				this.emailValidator])],
        });
		this.name = this.form.controls['name'];
		this.email = this.form.controls['email'];
    }

	nameValidator(name: FormControl): {[s: string]: boolean} {
		if (!name.value.match(/^[A-Za-z]+[A-Za-z0-9_]+$/)){
			return { invalidName: true };
		}
	}

	emailValidator(email: FormControl): {[s: string]: boolean} {
		let regex = new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i);
		if (!email.value.match(regex)){
			return { invalidEmail: true };
		}
	}


    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
		this.name_exists = false;
		this.email_exists = false;
    }


}
