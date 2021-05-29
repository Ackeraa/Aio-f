import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AlertService } from '../../_services';

@Component({
	selector: 'app-user-connection-settings',
	templateUrl: './connection-settings.component.html',
	styleUrls: ['./connection-settings.component.scss']
})
export class ConnectionSettingsComponent implements OnInit {

	codeforces: any;
	atcoder: any;
	poj: any;

	submitted: boolean;
	loading: boolean;

	constructor(private userService: UserService,
				private alertService: AlertService) {
	}

	ngOnInit(): void {
		this.codeforces = { name: ' ', password: ' ' };
		this.atcoder = { name: ' ', password: ' ' };
		this.poj = { name: ' ', password: ' ' };
	}
	
	connect(which: string): void {
		this.loading = true;
		this.userService.connect(which, this[which]).subscribe(
			() => {
				this.loading = false;
				this.alertService.success(`Connect successful to ${which}`);
			},
			err => {
				this.loading = false;
				this.alertService.error(`Connect failed to ${which}`);
				this[which] = { name: '', password: ''};
			});
	}

	onSubmit(): void {
	}

}
