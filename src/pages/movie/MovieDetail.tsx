import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCol,
	IonContent,
	IonGrid,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonRow,
	IonSelect,
	IonSelectOption,
	IonText,
} from "@ionic/react"
import { addCircleOutline, refreshOutline } from "ionicons/icons"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { deleteMovieById, getMovieById, updateMovie } from "../../api/api"
import { Comments } from "../../components/Comments"
import { Jwt, Movie } from "../../interfaces"

const decodeGenre: (genId: number) => string = genId => {
	switch (genId) {
		case 1:
			return "action"
		case 2:
			return "horror"
		case 3:
			return "comedy"
	}

	return ``
}

const MovieDetail: React.FC = () => {
	const { id } = useParams<{ id: string | undefined }>()
	const [movie, setMovie] = useState<Movie>()
	const [title, setTitle] = useState<string>("")
	const [year, setYear] = useState<number>(0)
	const [rating, setRating] = useState<number>(0)
	const [description, setDescription] = useState<string>("")
	const [genre, setGenre] = useState<number>(0)
	const [duration, setDuration] = useState<number>(0)
	const [jwt, setJwt] = useState<Jwt | null>(
		JSON.parse(localStorage.getItem("jwt")!)
	)
	useEffect(() => {
		const fetchData = async () => {
			const data = await getMovieById(Number(id))
			setMovie(data)
		}
		fetchData()
	}, [])
	const sendMovieToUpdate = async (e: React.FormEvent) => {
		e.preventDefault()
		const status = await updateMovie(
			{
				id: movie?.id!,
				title: title,
				duration: duration,
				yearOfRelease: year,
				description,
				genre,
				rating,
			},
			Number(id)
		)
	}

	const handleDelete = async (e: React.MouseEvent) => {
		await deleteMovieById(Number(id))
		window.location.href = "/"
	}
	if (!movie) return <p>Loading...</p>
	return (
		<IonContent>
			<IonCard>
				<IonCardHeader>
					<IonCardSubtitle>{decodeGenre(movie.genre)}</IonCardSubtitle>
					<IonCardTitle>{movie.title}</IonCardTitle>
					<IonText>
						<p>Duration:{movie.duration} minutes</p>
					</IonText>
					<IonText>
						<p>Year of Release: {movie.yearOfRelease}</p>
					</IonText>
					<IonText>
						<p>rating: {movie.rating}</p>
					</IonText>
				</IonCardHeader>

				<IonCardContent>Short description: {movie.description}</IonCardContent>
			</IonCard>
			<Comments movieId={movie.id}/>
			{jwt ? <>
				<IonGrid>
					<form method="post" onSubmit={e => sendMovieToUpdate(e)}>
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
									Update movie
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
				</IonGrid>
				<IonButton onClick={e => handleDelete(e)} type="reset">
					<IonIcon slot="start" />
					Delete
				</IonButton>
			</> : null}
		</IonContent>
	)
}

export default MovieDetail
