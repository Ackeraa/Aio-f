import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
	UserComponent,
	HomeComponent,
	ContestsComponent,
	ProblemsComponent, 
	GroupsComponent, 
	FriendsComponent, 
	SettingsComponent,
	GeneralSettingsComponent,
	PasswordSettingsComponent,
	ConnectionSettingsComponent,
	PrivacySettingsComponent 
} from '.';

@NgModule({
	declarations: [
		UserComponent,
		HomeComponent,
		ContestsComponent,
		ProblemsComponent, 
		GroupsComponent, 
		FriendsComponent, 
		SettingsComponent,
		GeneralSettingsComponent,
		PasswordSettingsComponent,
		ConnectionSettingsComponent,
		PrivacySettingsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule 
	],
	exports: [
		UserComponent
	]
})
export class UserModule { }
