import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, Observable, fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap } from 'rxjs/operators'; 
import { Router } from '@angular/router';
import { ContestService } from '../contest.service';
import { AuthService } from '../../_services/auth.service';

@Component({
	selector: 'app-contest-problems',
	templateUrl: './problems.component.html',
	styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent implements OnInit {

	user: any;
	loading: boolean;
	allProblems: any;
	problems: Array<any>;
	p: number;
	total: number;

	constructor(private router: Router,
			    private contestService: ContestService,
			    private authService: AuthService){
	}

	ngOnInit(): void {
		this.p = 1;
		this.problems = [];
		this.contestService.problems$
			.subscribe(problems => {
				this.problems = problems;
			});
		this.authService.user$
			.pipe(filter(x => x != null))
			.subscribe(user => { 
				this.user = user;
			});
	}

	setAllProblems(data: any): void {
		this.allProblems = JSON.parse(data.problems);
		this.total = data.total;
		this.p = 1;
	}

	getPage(page: number): void {
		this.contestService.getPage(page)
			.subscribe(data => {
				this.allProblems = JSON.parse(data.problems);
				this.total = data.total;
				this.p = page;
			});
	}

	setLoading(loading: boolean): void {
		this.loading = loading;
	}


	viewProblem(source: string, id: string): void {
		let url: string;
		if (source == "aio") {
			url = "/problem/l/" + id;
		} else {
			url = "/problem/v/" + id;
		}
		this.router.navigate([url]);
	}

	isAdded(id: string): boolean {
		if (this.problems){
			return this.problems.filter(x => x.id === id).length > 0;
		}
	}

	addProblem(id: string): void {
		this.contestService.addProblem(id);
	}

	deleteProblem(id: string): void {
		this.contestService.deleteProblem(id);
	}

}
