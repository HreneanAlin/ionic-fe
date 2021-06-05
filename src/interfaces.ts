export interface Movie {
	id: number
	title: string
	description: string
	duration: number
	yearOfRelease: number
	dateAdded: string
	genre: number
	watched: boolean
	rating: number
}
export interface MovieUpdated {
	id: number
	title: string
	description: string
	duration: number
	yearOfRelease: number
	genre: number
	rating: number
}
export interface MovieNew {
	title: string
	description: string
	duration: number
	yearOfRelease: number

	genre: number

	rating: number
}
