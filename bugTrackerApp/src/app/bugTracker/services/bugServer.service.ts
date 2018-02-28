import { Injectable } from '@angular/core';
import { Bug } from '../models/Bug';
import { Http } from '@angular/http';
import { BugOperationsService } from './bugOperations.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BugServerService{
	constructor(private http : Http, private bugOperations : BugOperationsService){

	}
	getAll() : Observable<Bug[]>{
		return this.http
			.get('http://localhost:3000/bugs')
			.map(response => response.json());
	}
	addNew(bugName : string) : Observable<Bug> {
		let newBugData = this.bugOperations.createNew(bugName);
		return this.http
			.post('http://localhost:3000/bugs', newBugData)
			.map(response => response.json());
	}
	toggle(bugToToggle : Bug) : Observable<Bug> {
		let toggledBugData = this.bugOperations.toggle(bugToToggle);
		return this.http
			.put('http://localhost:3000/bugs/' + bugToToggle.id, toggledBugData)
			.map(response => response.json());
	}
	remove(bugToRemove : Bug) : Observable<any> {
		return this.http
			.delete('http://localhost:3000/bugs/' + bugToRemove.id)
			.map(response => response.json());
	}
}