import { IonRow, IonCol, IonItem, IonButton } from "@ionic/react"
import React from "react"
import { Movie, PaginatedResult,Comment } from "../interfaces"

interface PaginationProps {
	pagination: PaginatedResult<Movie | Comment >
	setPageNr: React.Dispatch<React.SetStateAction<number>>
}

export const Pagination: React.FC<PaginationProps> = ({
	pagination,
	setPageNr,
}) => {
	return (
		<IonRow>
			<IonCol>
				<IonItem>
					{pagination?.firstPages.map(pageNr => (
						<IonButton
							key={pageNr}
							onClick={e => setPageNr(pageNr)}
							size="small"
						>
							{pageNr}
						</IonButton>
					))}
					<IonButton color="success" size="small">
						{pagination?.currentPage}
					</IonButton>
					{pagination?.nextPages.map(pageNr => (
						<IonButton
							key={pageNr}
							onClick={e => setPageNr(pageNr)}
							size="small"
						>
							{pageNr}
						</IonButton>
					))}
					{pagination?.lastPages.length ? (
						<>
							<IonButton size="small">...</IonButton>
							{pagination?.lastPages.map(pageNr => (
								<IonButton
									key={pageNr}
									onClick={e => setPageNr(pageNr)}
									size="small"
								>
									{pageNr}
								</IonButton>
							))}
						</>
					) : null}
				</IonItem>
			</IonCol>
		</IonRow>
	)
}
