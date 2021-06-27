import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators'; 
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
	selector: 'app-user-contests',
	templateUrl: './contests.component.html',
	styleUrls: ['./contests.component.scss']
})
export class ContestsComponent implements OnInit {

	contests: any;

	constructor(private userService: UserService,
			    private router: Router) { }

	ngOnInit(): void {
		this.userService.contests$
			.pipe(filter(x => x != null))
			.subscribe(contests => this.contests = contests);
	}
	
	viewContest(id: any): void {
		let url = 'contest/' + id;
		this.router.navigate([url]);
	}
}
