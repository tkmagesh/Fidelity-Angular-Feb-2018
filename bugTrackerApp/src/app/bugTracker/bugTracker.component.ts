import { Component, OnInit } from '@angular/core';
import { Bug } from './models/Bug';
import { BugStorageService } from './services/bugStorage.service';
import { BugServerService } from './services/bugServer.service';


@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit{
	bugs : Bug[] = [];

	sortBugBy : string = 'name';
	sortByDescending : boolean = false;
	
	

	ngOnInit(){
		//this.bugs = this.bugStorage.getAll();
		this.bugServer
			.getAll()
			.subscribe(bugs => this.bugs = bugs);
	}

	constructor(private bugStorage : BugStorageService, private bugServer : BugServerService){
		
	}

	onBugCreated(newBug : Bug){
		//this.bugs.push(newBug);
		this.bugs = [...this.bugs, newBug];
	}
	onBugNameClick(bugToToggle : Bug){
		this.bugServer.toggle(bugToToggle)
			.subscribe(toggledBug => {
				this.bugs = this.bugs.map(bug => bug.id === bugToToggle.id ? toggledBug : bug);		
			});
	}

	onRemoveClosedClick(){
		this.bugs
			.filter(bug => bug.isClosed)
			.forEach(closedBug => {
				this.bugServer
					.remove(closedBug)
					.subscribe(() => this.bugs = this.bugs.filter(bug => bug.id !== closedBug.id));
			});
	}
}