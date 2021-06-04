import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProblemService } from './problem.service'; 

@Component({
	selector: 'app-problem',
	templateUrl: './problem.component.html',
	styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

	source: string;
	constructor(private route: ActivatedRoute,
			    private problemService: ProblemService) {
	}

	ngOnInit(): void {
		this.source = this.route.snapshot.paramMap.get('source');
		let id = this.route.snapshot.paramMap.get('id');
		this.problemService.getProblem(this.source, id);
	}
}
