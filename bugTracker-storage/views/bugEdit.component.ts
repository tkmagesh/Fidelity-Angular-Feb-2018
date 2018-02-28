import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BugStorageService } from '../services/bugStorage.service';
import { Bug } from '../models/Bug';

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

	constructor(private bugStorage : BugStorageService) {}

	ngOnInit() {
		
	}

	onCreateNewClick(){
		let bug : Bug = this.bugStorage.addNew(this.newBugName);
		this.newBugName = '';
		this.onNewBug.emit(bug);
	}
}