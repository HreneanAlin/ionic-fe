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

export interface UserForRegistration {
	email: string
	password: string
	confirmPassword: string
}
export interface UserForLogin {
	email: string
	password: string
}

export interface ConfirmUser {
	email?: string
	confirmationToken: string
}
export interface Jwt {
	token?: string
	expiration?: string
}
