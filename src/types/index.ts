export interface IPizza{
	id: number,
imageUrl: string,
name: string,
types: number[],
sizes: number[],
price: number,
category?: number,
rating?: number,
}

export interface ICartItem{
	id: number,
	name: string,
	price: number,
	imageUrl: string,
	size: number,
	type: number,
	count: number
  }