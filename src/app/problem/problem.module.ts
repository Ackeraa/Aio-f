import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';
import { ProblemRoutingModule } from './problem-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchModule } from '../_components';
import { CommentsModule } from '../_components';
import { SubmissionsModule } from '../_components';

import {
	DescriptionComponent,
	DiscussionComponent,
	MySubmissionsComponent,
	SolutionsComponent,
	SubmissionsComponent,
	SubmitComponent,
	UploadComponent
} from '.';

@NgModule({
	declarations: [
		DescriptionComponent,
		DiscussionComponent,
		MySubmissionsComponent,
		SolutionsComponent,
		SubmissionsComponent,
		SubmitComponent,
		UploadComponent
	],
	imports: [
		CommonModule,
        HttpClientModule,
		FormsModule,
		FileUploadModule,
		CodemirrorModule,
		ProblemRoutingModule,
		NgxPaginationModule,
		SearchModule,
		CommentsModule,
		SubmissionsModule,
		MarkdownModule.forChild(),
	],
	exports: [
	]
})
export class ProblemModule { }
