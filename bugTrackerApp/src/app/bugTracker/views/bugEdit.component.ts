import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BugStorageService } from '../services/bugStorage.service';
import { Bug } from '../models/Bug';
import { BugServerService } from '../services/bugServer.service';

@Component({
	selector: 'app-bug-tracker-edit',
	template : `
		<section class="edit">
			<label for="">Bug Name :</label>
			<input type="text" [(ngModel)]="newBugName">
			<input type="button" value="Create New" (click)="onCreateNewClick()">
		</section>
	`
})
export class BugEditComponent implements OnInit {
	newBugName : string = '';

	@Output()
	onNewBug : EventEmitter<Bug> = new EventEmitter<Bug>();

	constructor(private bugServer : BugServerService) {}

	ngOnInit() {
		
	}

	onCreateNewClick(){
		this.bugServer
			.addNew(this.newBugName)
			.subscribe(bug => {
				this.newBugName = '';
				this.onNewBug.emit(bug);		
			})
		
	}
}