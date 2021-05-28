import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { filter, map} from 'rxjs/operators'; 
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
	realName: AbstractControl;
	school: AbstractControl;
	major: AbstractControl;
	motto: AbstractControl;

    loading: boolean;
    submitted: boolean;
	nameExists: boolean;
	emailExists: boolean;

    constructor(private formBuilder: FormBuilder,
				private userService: UserService) {
    }

    ngOnInit() {
		this.loading = true;
		this.submitted = false;
		this.nameExists = false;
		this.emailExists = false;
		this.userService.homeInfo$
			.pipe(filter(x => x != null),
				  map(data => JSON.parse(data.user)))
			.subscribe(user => {
				this.form = this.formBuilder.group({
					name: [user.name, Validators.compose([
						Validators.required,
						Validators.minLength(1),
						Validators.maxLength(10),
						this.nameValidator])],
					email: [user.email, Validators.compose([
						Validators.required,
						this.emailValidator])],
					realName: [user.realName],
					school: [user.school],
					major: [user.major],
					motto: [user.motto]
				});
				this.name = this.form.controls['name'];
				this.email = this.form.controls['email'];
				this.realName = this.form.controls['realName'];
				this.school = this.form.controls['school'];
				this.major = this.form.controls['major'];
				this.motto = this.form.controls['motto'];
				this.loading = false;
			});
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

    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
		this.nameExists = false;
		this.emailExists = false;
    }


}
