import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from '../_services';
import { SearchService } from '../_services';

@Injectable({
	providedIn: 'root'
})
export class ContestsService {

	constructor(private searchService: SearchService,
				private authService: AuthService) {
	}

	getPage(page: number): Observable<any> {
		return this.searchService.getPage(page);
	}

	create(data: any): Observable<any> {
		let url = 'contests';
		return this.authService.post(url, data);
	}

	edit(id: string, data: any): Observable<any> {
		let url = 'contests/' + id;
		return this.authService.put(url, data);
	}

	deleteContest(id: string): Observable<any> {
		let url = 'contests/' + id;
		return this.authService.delete(url);
	}

	getContest(id: string): Observable<any> {
		let url = 'contests/' + id;
		return this.authService.get(url);
	}
}
