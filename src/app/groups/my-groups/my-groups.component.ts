import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../groups.service';

@Component({
	selector: 'app-my-groups',
	templateUrl: './my-groups.component.html',
	styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {

	groups: Array<any>;
	loading: boolean;

	constructor(private groupsService: GroupsService) {
	}

	ngOnInit(): void {
		this.loading = true;
		this.groupsService.getMyGroups()
			.subscribe(groups => {
				this.groups = groups;
				this.loading = false;
			});
	}
}
