import { Component, Input } from '@angular/core';

@Component({
	selector : 'app-calculator-result',
	template : `
		<div [ngClass]="{positive : data >= 0, negative : data < 0}">{{data}}</div>
	`,
	styles : [
		`.positive{
			color : green;
		}`,
		`.negative{
			color : red;
		}`
	]
})
export class CalculatorResultComponent{

	@Input()
	data = null;
}