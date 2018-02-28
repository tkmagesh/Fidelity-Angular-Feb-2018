import { Component, OnInit } from '@angular/core';
import { Bug } from './models/Bug';
import { BugStorageService } from './services/bugStorage.service';


@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit{
	bugs : Bug[] = [];

	sortBugBy : string = 'name';
	sortByDescending : boolean = false;
	
	ngOnInit(){
		this.bugs = this.bugStorage.getAll();
	}

	constructor(private bugStorage : BugStorageService){
		
	}

	onCreateNewClick(bugName : string){
		let newBug : Bug = this.bugStorage.addNew(bugName);
		this.bugs.push(newBug);
	}
	onBugNameClick(bug:Bug){
		this.bugStorage.toggle(bug);
	}

	onRemoveClosedClick(){
		/*this.bugs = this.bugs.filter(bug => !bug.isClosed);*/
		for(let index = this.bugs.length-1; index >=0; index--){
			if (this.bugs[index].isClosed){
				this.bugStorage.remove(this.bugs[index]);
				this.bugs.splice(index, 1);
			}
		}
	}

	getClosedCount(){
		return this.bugs.reduce((result, bug) => bug.isClosed ? ++result : result, 0);
	}
}