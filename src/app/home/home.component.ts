import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	data: any;

    constructor(private homeService: HomeService,
			    private router: Router) { }

    ngOnInit() {
		this.homeService.getInfo()
			.subscribe( data => {
				this.data = data;
				this.data.recent_contests = data.recent_contests.map(x => JSON.parse(x));
				this.data.recent_problems = data.recent_problems.map(x => JSON.parse(x));
				this.data.top_users = data.top_users.map(x => JSON.parse(x));
			});
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
}

