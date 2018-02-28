import { Bug } from '../models/Bug';

export class BugOperationsService{
	createNew(bugName : string, id : number = 0) : Bug{
		let newBug : Bug = {
			id : id,
			name : bugName,
			isClosed : false,
			createdAt : new Date()
		};
		return newBug;
	}
	toggle(bugToToggle : Bug) : Bug {
		return { ...bugToToggle, isClosed : !bugToToggle.isClosed };
	}
}