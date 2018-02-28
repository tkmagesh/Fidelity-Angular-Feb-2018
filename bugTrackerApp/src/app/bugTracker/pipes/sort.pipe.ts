import { Pipe, PipeTransform } from '@angular/core';

interface Comparer{
	(p1:any, p2:any) : number;
}

@Pipe({
	name: 'sort',
	pure : true
})
export class SortPipe implements PipeTransform {
	private getComparer(attrName : string){
		return function(p1:any, p2:any) : number {
			if (p1[attrName] < p2[attrName]) return -1;
			if (p1[attrName] === p2[attrName]) return 0;
			return 1;
		}
	}
	private getDescending(comparer : Comparer){
		return function(p1 : any, p2 : any) : number {
			return comparer(p1, p2) * -1;
		}
	}
	transform(value: any[], attrName: string, descending : boolean = false): any[] {
		console.log('sort.transform triggered');
		let comparer = this.getComparer(attrName);
		if (descending)
			comparer = this.getDescending(comparer);
		return value.sort(comparer);
	}
}