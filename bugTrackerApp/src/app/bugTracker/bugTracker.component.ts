import { Component } from '@angular/core';
import { Bug } from './models/Bug';

@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent{
	bugs : Bug[] = [];

	onCreateNewClick(bugName : string){
		let newBug : Bug = {
			name : bugName,
			isClosed : false
		};
		this.bugs.push(newBug);
	}
	onBugNameClick(bug:Bug){
		bug.isClosed = !bug.isClosed;
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