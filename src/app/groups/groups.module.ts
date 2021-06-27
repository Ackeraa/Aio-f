import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { GroupsRoutingModule } from './groups-routing.module';
import { SearchModule } from '../_components/search/search.module';
import { GroupModule } from '../group/group.module';
import {
	ExploreComponent,
	MyGroupsComponent,
	CreateComponent
} from '.';

@NgModule({
	declarations: [
		ExploreComponent,
		MyGroupsComponent,
		CreateComponent,
	],
	imports: [
		CommonModule,
		GroupsRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SearchModule,
		GroupModule,
		NgxPaginationModule
	],
	exports: [
		ExploreComponent,
		MyGroupsComponent
	]
})
export class GroupsModule { }
