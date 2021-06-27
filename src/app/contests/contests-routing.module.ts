import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
	ContestsComponent,
	CreateComponent,
	RecentComponent,
	PastComponent,
	EditComponent
} from '.';

const routes: Routes = [
	{
		path: '', component: ContestsComponent,
		children: [
			{ path: '', redirectTo: 'recent' },
			{ path: 'create', component: CreateComponent },
			{ path: 'recent', component: RecentComponent },
			{ path: 'past', component: PastComponent },
			{ path: 'edit/:id', component: EditComponent }
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ContestsRoutingModule { }
