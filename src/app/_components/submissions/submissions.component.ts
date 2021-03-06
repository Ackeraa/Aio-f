import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { ActionCableService, Channel } from 'angular2-actioncable';
import { SubmissionsService } from '../../_services';

@Component({
	selector: 'app-submissions',
	templateUrl: './submissions.component.html',
	styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

	@Input() addition: any = {};

	uri: string = 'submissions';
	loading: boolean;
	p: number;
	total: number;
	receiver: Subscription;
	submissions: Array<any>;

	constructor(private submissionsService: SubmissionsService) {
	}

	ngOnInit(): void {
		//only receive.
		this.receiver = this.submissionsService.getSubmissionsChannel(this.addition)
			.pipe(filter(x => x != null))
			.subscribe(submission => {
				console.log(submission);
				let i = this.submissions.findIndex(x => x.id === submission.id);
				if (i == -1) {
					this.submissions.unshift(submission);
				} else {
					this.submissions[i] = submission;
				}
			});
	}

	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	setSubmissions(data: any): void {
		this.submissions = JSON.parse(data.submissions);
		console.log(this.submissions);
		this.total = data.total;
	}

	getPage(page: number): void {
		this.submissionsService.getSubmissionsPage(page)
			.subscribe(data => {
				this.submissions = JSON.parse(data.submissions);
				this.total = data.total;
				this.p = page;
			});
	}
	ngOnDestroy(): void {
		this.receiver.unsubscribe();
	}

}
