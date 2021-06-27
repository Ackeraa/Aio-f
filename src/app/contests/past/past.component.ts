import { Component, OnInit } from '@angular/core';
import { map, filter, switchMap } from 'rxjs/operators'; 
import { ContestsService } from '../contests.service';
import { AuthService } from '../../_services/auth.service';

@Component({
	selector: 'app-contests-past',
	templateUrl: './past.component.html',
	styleUrls: ['./past.component.scss']
})
export class PastComponent implements OnInit {

	uri: string = 'contests';
	addition: string = 'past';
	loading: boolean;
	contests: Array<any>;
	p: number;
	total: number;
	user: any;

	constructor(private contestsService: ContestsService,
			    private authService: AuthService) {
	}

	ngOnInit(): void {
		this.authService.user$
			.pipe(filter(x => x != null))
			.subscribe(user => this.user = user);
	}

	setContests(data: any): void {
		this.contests = JSON.parse(data.contests);
		this.contests.map(contest => {
			let start_day = new Date(contest.start_time).getDay();
			let end_day = new Date(contest.end_time).getDay();
			contest.days = end_day - start_day;
			return contest;
		});
		this.total = data.total;
	}

	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	getPage(page: number): void {
		this.contestsService.getPage(page)
			.subscribe(data => {
				this.contests = JSON.parse(data.contests);
				this.total = data.total;
				this.p = page;
			});
	}

	deleteContest(id: string): void {
		let index = this.contests.findIndex(x => x.id == id);
		this.contests.splice(index, 1);
		this.contestsService.deleteContest(id);
	}
}
