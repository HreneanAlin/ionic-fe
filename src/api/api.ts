import axios from "axios"
import { Movie, MovieNew, MovieUpdated } from "../interfaces"

const BASE_URL: string = "https://localhost:5001/api"

export const getMovies = async () => {
	const { data } = await axios.get(`${BASE_URL}/Movie`)
	return data
}

export const getMovieById = async (id: number) => {
	const { data } = await axios.get(`${BASE_URL}/Movie/${id}`)
	console.log("🚀 ~ file: api.ts ~ line 12 ~ getMovieById ~ data", data)

	return data
}
export const deleteMovieById = async (id: number) => {
	const { data } = await axios.delete(`${BASE_URL}/Movie/${id}`)
	console.log("🚀 ~ file: api.ts ~ line 12 ~ getMovieById ~ data", data)

	return data
}

export const addMovie = async (movie: MovieNew) => {
	const { status } = await axios.post(`${BASE_URL}/Movie`, movie)
    console.log("🚀 ~ file: api.ts ~ line 20 ~ addMovie ~  status",  status)
	return status
}
export const updateMovie = async (movie: MovieUpdated,id:number) => {
	const { status } = await axios.put(`${BASE_URL}/Movie/${id}`, movie)
    console.log("🚀 ~ file: api.ts ~ line 20 ~ addMovie ~  status",  status)
	return status
}
