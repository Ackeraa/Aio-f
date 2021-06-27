import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavigationStart, Router } from '@angular/router';
import { ContestsService } from '../contests.service';
import {
	NgbDateStruct,
	NgbCalendar,
	NgbTimepickerConfig,
	NgbTimeStruct
} from '@ng-bootstrap/ng-bootstrap';
import {
	FormBuilder,
	FormGroup,
	FormArray,
	Validators,
	AbstractControl,
	FormControl
} from '@angular/forms';


@Component({
	selector: 'app-contest-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

	id: string;
	loading: boolean;
	start_d: NgbDateStruct;
	start_t: NgbTimeStruct;
	start_time: string;
	end_d: NgbDateStruct;
	end_t: NgbTimeStruct;
	end_time: string;

	form: FormGroup;
	name: AbstractControl;
	description: AbstractControl;
	password: AbstractControl;
	is_visible: boolean;
	rule_type: string;
	constructor(private router: Router,
				private route: ActivatedRoute,
				private fb: FormBuilder,
				private calendar: NgbCalendar,
				private config: NgbTimepickerConfig,
			    private contestsService: ContestsService) {
		this.config.seconds = false;
        this.config.spinners = false;
	}

	ngOnInit(): void {
		this.loading = true;
		this.id = this.route.snapshot.paramMap.get('id');
		this.contestsService.getContest(this.id).subscribe(contest => {
			this.form = this.fb.group({
				name: [contest.name, Validators.required],
				description: [contest.description, Validators.required],
				password: [contest.password, Validators.required],
			});
			this.name = this.form.controls['name'];
			this.description = this.form.controls['description']; 
			this.password = this.form.controls['password'];
			this.is_visible = contest.is_visible;
			this.rule_type = contest.rule_type;
			this.loading = false;
		});
	}

	onSubmit(form: any): void {
		let data: any = form
		data.rule_type = this.rule_type;
		data.is_visible = this.is_visible;
		data.start_time = new Date(this.start_d.year, this.start_d.month - 1, this.start_d.day,
								   this.start_t.hour, this.start_t.minute);
		data.end_time = new Date(this.end_d.year, this.end_d.month - 1, this.end_d.day,
								   this.end_t.hour, this.end_t.minute);
		this.contestsService.edit(this.id, data)
		.subscribe(
			res => {
				console.log("success");
				this.router.navigate(['/contest/' + res.id]);
			},
			err => {
				console.log(err);
			}
		);
	}

	//rule
	selectRule(rule: any) {
		this.rule_type = rule;
	}

	//visible
	selectVisible(visible: boolean) {
		this.is_visible = visible;
	}

}
