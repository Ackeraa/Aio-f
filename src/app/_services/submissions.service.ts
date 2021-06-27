import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { Angular2TokenService } from 'angular2-token';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { SearchService } from './search.service';

@Injectable({
	providedIn: 'root'
})
export class SubmissionsService {

	constructor(private searchService: SearchService,
				private cableService: ActionCableService,
				private tokenService: Angular2TokenService){
	}

	getSubmissionsChannel(params: any): Observable<any> {
		console.log("FUCK", params);
		let url = 'ws://39.106.54.201:3000/cable';
		let channel = 'SubmissionsChannel';
		return this.cableService
		   .cable(url)
		   .channel(channel, params)
		   .received();
	}

	getSubmissionsPage(page: number) :Observable<any> {
		return this.searchService.getPage(page);
	}
}
