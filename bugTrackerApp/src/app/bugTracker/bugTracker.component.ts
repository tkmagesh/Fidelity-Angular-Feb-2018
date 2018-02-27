import { Component } from '@angular/core';
import { Bug } from './models/Bug';
import { BugOperationsService } from './services/bugOperations.service';

@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent{
	bugs : Bug[] = [];

	

	constructor(private bugOperations : BugOperationsService){
		
	}

	onCreateNewClick(bugName : string){
		let newBug : Bug = this.bugOperations.createNew(bugName);
		this.bugs.push(newBug);
	}
	onBugNameClick(bug:Bug){
		this.bugOperations.toggle(bug);
	}

	onRemoveClosedClick(){
		/*this.bugs = this.bugs.filter(bug => !bug.isClosed);*/
		for(let index = this.bugs.length-1; index >=0; index--){
			if (this.bugs[index].isClosed)
				this.bugs.splice(index, 1);
		}
	}

	getClosedCount(){
		return this.bugs.reduce((result, bug) => bug.isClosed ? ++result : result, 0);
	}
}