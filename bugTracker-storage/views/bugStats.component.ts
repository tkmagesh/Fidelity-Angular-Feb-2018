import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Bug } from '../models/Bug';

@Component({
	selector: 'app-bug-tracker-stats',
	template : `
		<section class="stats">
			<div>{{getTime()}}</div>
			<span class="closed">{{bugs | closedCount}}</span>
			<span> / </span>
			<span>{{bugs.length}}</span>
		</section>
	`,
	changeDetection : ChangeDetectionStrategy.OnPush
})
export class BugStatsComponent implements OnInit {

	@Input('data')
	bugs : Bug[] = [];

	getTime(){
		return new Date();
	}
	constructor() {}

	ngOnInit() {
		
	}
}