import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { AuthService } from '../_services';
import { SearchService } from '../_services';

@Injectable({
	providedIn: 'root'
})
export class GroupsService {

	query: string;

	constructor(private searchService: SearchService,
				private authService: AuthService) {
	}

	getPage(page: number): Observable<any> {
		return this.searchService.getPage(page);
	}

	getMyGroups(): Observable<any> {
		let url = 'groups/get_my_groups';
		return this.authService.get(url);
	}

	create(data: any): Observable<any> {
		let url = 'groups';
		return this.authService.post(url, data);
	}
}
