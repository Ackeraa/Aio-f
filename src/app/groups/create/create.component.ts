import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { GroupsService } from '../groups.service';
import {
	FormBuilder,
	FormGroup,
	FormArray,
	Validators,
	AbstractControl,
	FormControl
} from '@angular/forms';

@Component({
	selector: 'app-groups-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
	form: FormGroup;
	name: AbstractControl;
	description: AbstractControl;

	constructor(private router: Router,
				private fb: FormBuilder,
			    private groupsService: GroupsService) {
	}

	ngOnInit(): void {
		this.form = this.fb.group({
			name: ['', Validators.required],
			description: ['', Validators.required],
		});

		this.name = this.form.controls['name'];
		this.description = this.form.controls['description']; 
	}

	onSubmit(form: any) {
		this.groupsService.create(form)
			.subscribe(group => {
				this.router.navigate(['/group/' + group.id]);
			});
	}
}


