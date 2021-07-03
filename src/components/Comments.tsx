import {
	IonCol,
	IonGrid,
	IonIcon,
	IonItem,
	IonLabel,
	IonRow,
	IonSelect,
	IonSelectOption,
} from "@ionic/react"
import { arrowForwardCircleOutline } from "ionicons/icons"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getComments } from "../api/api"
import { PaginatedResult, Comment, Jwt } from "../interfaces"
import { AddComment } from "./AddComment"
import { Pagination } from "./Pagination"

interface CommentsProps {
	movieId: number
}

export const Comments: React.FC<CommentsProps> = ({ movieId }) => {
	const [pagination, setPagination] = useState<PaginatedResult<Comment>>()
	console.log("🚀 ~ file: Comments.tsx ~ line 12 ~ pagination", pagination)
	const [pageNr, setPageNr] = useState<number>(1)
	const [itemsPerPage, setItemsPerPage] = useState<number>(10)
	const [jwt, setJwt] = useState<Jwt | null>(
		JSON.parse(localStorage.getItem("jwt")!)
	)
	useEffect(() => {
		const fetchData = async () => {
			setPagination(
				(await getComments(
					movieId,
					pageNr,
					itemsPerPage
				)) as PaginatedResult<Comment>
			)
		}
		fetchData()
	}, [pageNr, itemsPerPage])

	return (
		<>
			<h1>Comments</h1>
			<IonGrid>
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
					? pagination.entities.map(comm => (
							<IonRow key={comm.id}>
								<IonCol>
									<IonItem>
										<IonLabel>{comm.text}</IonLabel>
										{comm.important ? (
											<>
												<span>Important</span>
											</>
										) : null}
									</IonItem>
								</IonCol>
							</IonRow>
					  ))
					: "loading..."}
				<Pagination setPageNr={setPageNr} pagination={pagination!} />
			</IonGrid>

			{jwt ? <AddComment movieId={movieId} /> : null}
		</>
	)
}
