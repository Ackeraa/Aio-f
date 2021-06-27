import { Component, OnInit } from '@angular/core';
import { map, filter, switchMap } from 'rxjs/operators'; 
import { ContestsService } from '../contests.service';
import { AuthService } from '../../_services/auth.service';

@Component({
	selector: 'app-contests-recent',
	templateUrl: './recent.component.html',
	styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {

	uri: string = 'contests';
	addition: string = 'recent';
	loading: boolean;
	contests: any;
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
			let start_time = Date.parse(contest.start_time);
			let end_time = Date.parse(contest.end_time);
			contest.days = (end_time - start_time) / (24*60*60*1000);
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

	editContest(id: string): void {

	}

	deleteContest(id: string): void {
		let index = this.contests.findIndex(x => x.id == id);
		this.contests.splice(index, 1);
		this.contestsService.deleteContest(id);
	}
}
