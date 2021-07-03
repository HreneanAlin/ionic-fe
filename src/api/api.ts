import axios from "axios"
import { SubmitHandler } from "react-hook-form"
import {
	ConfirmUser,
	Jwt,
	Movie,
	MovieNew,
	MovieUpdated,
	UserForLogin,
	UserForRegistration,
	Comment,
} from "../interfaces"

const BASE_URL: string = "https://localhost:5001/api"
const jwt = JSON.parse(localStorage.getItem("jwt")!) as Jwt

export const getMovies = async (page?: number, perPage?: number) => {
	const { data } = await axios.get(`${BASE_URL}/Movie`, {
		params: {
			page: page,
			perPage: perPage,
		},
	})
	console.log("🚀 ~ file: api.ts ~ line 18 ~ getMovies ~ data", data)
	return data
}
export const getComments = async (
	movieId: number,
	page?: number,
	perPage?: number
) => {
	const { data } = await axios.get(`${BASE_URL}/Movie/${movieId}/Comments`, {
		params: {
			page: page,
			perPage: perPage,
		},
	})
	console.log("🚀 ~ file: api.ts ~ line 18 ~ getComments ~ data", data)
	return data
}
export const postComment = async (
	movieId: number,
	comment: SubmitHandler<Comment>
) => {
	console.log(comment)
	
	const { data } = await axios.post(
		`${BASE_URL}/Movie/${movieId}/Comments`,
		comment,
		{
			headers: {
				Authorization: `Bearer ${jwt.token}`,
			},
		}
	)
	console.log("🚀 ~ file: api.ts ~ line 18 ~ postgComments ~ data", data)
	return data
}

export const getMovieById = async (id: number) => {
	const { data } = await axios.get(`${BASE_URL}/Movie/${id}`)
	console.log("🚀 ~ file: api.ts ~ line 12 ~ getMovieById ~ data", data)

	return data
}
export const deleteMovieById = async (id: number) => {
	const { data } = await axios.delete(`${BASE_URL}/Movie/${id}`, {
		headers: {
			Authorization: `Bearer ${jwt.token}`,
		},
	})
	console.log("🚀 ~ file: api.ts ~ line 12 ~ getMovieById ~ data", data)

	return data
}

export const addMovie = async (movie: MovieNew) => {
	console.log(jwt.token)
	const { status } = await axios.post(`${BASE_URL}/Movie`, movie, {
		headers: {
			Authorization: `Bearer ${jwt.token}`,
		},
	})
	console.log("🚀 ~ file: api.ts ~ line 20 ~ addMovie ~  status", status)
	return status
}
export const updateMovie = async (movie: MovieUpdated, id: number) => {
	const { status } = await axios.put(`${BASE_URL}/Movie/${id}`, movie, {
		headers: {
			Authorization: `Bearer ${jwt.token}`,
		},
	})
	console.log("🚀 ~ file: api.ts ~ line 20 ~ addMovie ~  status", status)
	return status
}

export const registerUser = async (
	user: SubmitHandler<UserForRegistration>
) => {
	const { data } = await axios.post(`${BASE_URL}/authentication/register`, user)
	console.log("🚀 ~ file: api.ts ~ line 42 ~ registerUser ~ data", data)
	return data
}
export const loginUser = async (user: SubmitHandler<UserForLogin>) => {
	const { data } = await axios.post(`${BASE_URL}/authentication/login`, user)
	console.log("🚀 ~ file: api.ts ~ line 42 ~ registerUser ~ data", data)
	return data
}

export const sendConfirmUser = async (confirmUser: ConfirmUser) => {
	const { status } = await axios.post(
		`${BASE_URL}/authentication/confirm`,
		confirmUser
	)
	console.log("🚀 ~ file: api.ts ~ line 42 ~ registerUser ~ data", status)
	return status
}
