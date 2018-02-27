import { Component } from '@angular/core';

@Component({
	selector : 'app-products-list',
	templateUrl : 'productsList.component.html'
})
export class ProductsListComponent{

	products : string[]= [
		'Pen',
		'Pencil'
	];

}