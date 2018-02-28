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

	onBugCreated(newBug : Bug){
		//this.bugs.push(newBug);
		this.bugs = [...this.bugs, newBug];
	}
	onBugNameClick(bugToToggle : Bug){
		let toggledBug : Bug = this.bugStorage.toggle(bugToToggle);
		this.bugs = this.bugs.map(bug => bug.id === bugToToggle.id ? toggledBug : bug);
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
}