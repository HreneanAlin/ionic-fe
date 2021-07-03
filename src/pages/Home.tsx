import {
	IonButton,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonListHeader,
	IonPage,
	IonRow,
	IonSelect,
	IonSelectOption,
	IonTitle,
	IonToolbar,
} from "@ionic/react"
import {
	calculatorOutline,
	refreshOutline,
	arrowForwardCircleOutline,
	addCircleOutline,
} from "ionicons/icons"

import React, { SetStateAction, useEffect, useState } from "react"
import { addMovie, getMovies } from "../api/api"
import ExploreContainer from "../components/ExploreContainer"
import "./Home.css"
import { Jwt, Movie, PaginatedResult } from "../interfaces"
import { Link } from "react-router-dom"
import { Pagination } from "../components/Pagination"

const Home: React.FC = () => {
	const [pagination, setPagination] = useState<
		PaginatedResult<Movie> | undefined
	>()
	const [title, setTitle] = useState<string>("")
	const [year, setYear] = useState<number>(0)
	const [rating, setRating] = useState<number>(0)
	const [description, setDescription] = useState<string>("")
	const [genre, setGenre] = useState<number>(0)
	const [duration, setDuration] = useState<number>(0)
	const [pageNr, setPageNr] = useState<number>(1)
	const [itemsPerPage, setItemsPerPage] = useState<number>(10)
	const [jwt, setJwt] = useState<Jwt | null>(
		JSON.parse(localStorage.getItem("jwt")!)
	)
	useEffect(() => {
		const fetchData = async () => {
			setPagination(
				(await getMovies(pageNr, itemsPerPage)) as PaginatedResult<Movie>
			)
		}
		fetchData()
	}, [pageNr, itemsPerPage])

	const sendMovie = async (e: React.FormEvent) => {
		e.preventDefault()
		const status = await addMovie({
			title: title,
			duration: duration,
			yearOfRelease: year,
			description,
			genre,
			rating,
		})
	}

	return (
		<IonContent className="ion-padding">
			<IonGrid>
				<IonItem>
					<IonListHeader color="primary">
						<IonLabel>
							{jwt ? (
								<> Welcome you are loged in. <Link style={{color:"white"}} to="logout">logout</Link></>
							) : (
								<>
									Clik here to <Link style={{color:"white"}} to="/login">login</Link> ? Don't have an
									account? <Link  style={{color:"white"}} to="/register">register</Link>
								</>
							)}
						</IonLabel>
					</IonListHeader>
				</IonItem>
				<IonItem>
					<IonLabel>Items per page</IonLabel>
					<IonSelect
						onIonChange={e => setItemsPerPage(Number(e.detail.value!))}
						okText="Okay"
						cancelText="Dismiss"
					>
						{[...Array(40).keys()].slice(6).map(num => (
							<IonSelectOption value={num}>{num}</IonSelectOption>
						))}
					</IonSelect>
				</IonItem>
				<Pagination setPageNr={setPageNr} pagination={pagination!} />

				{pagination?.entities
					? pagination.entities.map(movie => (
							<IonRow key={movie.id}>
								<IonCol>
									<IonItem>
										<IonLabel>{movie.title}</IonLabel>
										<Link to={`/movies/${movie.id}`}>
											<IonIcon slot="end" icon={arrowForwardCircleOutline} />
										</Link>
									</IonItem>
								</IonCol>
							</IonRow>
					  ))
					: "loading..."}
				<Pagination setPageNr={setPageNr} pagination={pagination!} />
				{jwt ? (
					<>
						<IonRow>
							<IonCol>
								<IonItem>
									<h2 id="title">Enter a new movie</h2>
								</IonItem>
							</IonCol>
						</IonRow>
						<form method="post" onSubmit={e => sendMovie(e)}>
							<IonRow>
								<IonCol>
									<IonItem>
										<IonInput
											placeholder="Title"
											onIonChange={e => setTitle(e.detail.value!)}
											clearInput
										></IonInput>
									</IonItem>
								</IonCol>
								<IonCol>
									<IonItem>
										<IonInput
											placeholder="Year of Release"
											type="number"
											onIonChange={e => setYear(Number(e.detail.value!))}
											clearInput
										></IonInput>
									</IonItem>
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<IonItem>
										<IonInput
											placeholder="Descrption"
											onIonChange={e => setDescription(e.detail.value!)}
											clearInput
										></IonInput>
									</IonItem>
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<IonItem>
										<IonInput
											placeholder="Duration in minutes"
											type="number"
											onIonChange={e => setDuration(Number(e.detail.value!))}
											clearInput
										></IonInput>
									</IonItem>
								</IonCol>
								<IonCol>
									<IonItem>
										<IonLabel>Genre</IonLabel>
										<IonSelect
											onIonChange={e => setGenre(Number(e.detail.value!))}
											okText="Okay"
											cancelText="Dismiss"
										>
											<IonSelectOption value="1">Action</IonSelectOption>
											<IonSelectOption value="2">Horror</IonSelectOption>
											<IonSelectOption value="3">Comedy</IonSelectOption>
										</IonSelect>
									</IonItem>
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<IonItem>
										<IonLabel>Rating</IonLabel>
										<IonSelect
											onIonChange={e => setRating(Number(e.detail.value!))}
											okText="Okay"
											cancelText="Dismiss"
										>
											<IonSelectOption value="1">1</IonSelectOption>
											<IonSelectOption value="2">2</IonSelectOption>
											<IonSelectOption value="3">3</IonSelectOption>
											<IonSelectOption value="4">4</IonSelectOption>
											<IonSelectOption value="5">5</IonSelectOption>
											<IonSelectOption value="6">6</IonSelectOption>
											<IonSelectOption value="7">7</IonSelectOption>
											<IonSelectOption value="8">8</IonSelectOption>
											<IonSelectOption value="9">9</IonSelectOption>
											<IonSelectOption value="10">10</IonSelectOption>
										</IonSelect>
									</IonItem>
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="ion-text-left">
									<IonButton type="submit">
										<IonIcon slot="start" icon={addCircleOutline} />
										Add Movie
									</IonButton>
								</IonCol>
								<IonCol className="ion-text-right">
									<IonButton type="reset">
										<IonIcon slot="start" icon={refreshOutline} />
										Reset
									</IonButton>
								</IonCol>
							</IonRow>
						</form>
					</>
				) : null}
			</IonGrid>
		</IonContent>
	)
}

export default Home
