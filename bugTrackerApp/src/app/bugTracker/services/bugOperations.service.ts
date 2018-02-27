import { Bug } from '../models/Bug';

export class BugOperationsService{
	createNew(bugName : string) : Bug{
		let newBug : Bug = {
			name : bugName,
			isClosed : false
		};
		return newBug;
	}
	toggle(bugToToggle : Bug) : void {
		bugToToggle.isClosed = !bugToToggle.isClosed;
	}
}