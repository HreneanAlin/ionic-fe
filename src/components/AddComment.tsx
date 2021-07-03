import {
	IonButton,
	IonCheckbox,
	IonCol,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonRow,
	IonText,
} from "@ionic/react"
import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { postComment } from "../api/api"
import { Comment } from "../interfaces"
import { useHistory } from 'react-router-dom'

interface AddCommentProps {
	movieId: number
}

export const AddComment: React.FC<AddCommentProps> = ({ movieId }) => {
    const { register, handleSubmit } = useForm<Comment>()
    const history = useHistory()

	const onSubmit = async (data: SubmitHandler<Comment>) => {
		 await postComment(movieId, data)
		 history.go(0)
	}

	return (
		<IonList>
			<form method="post" onSubmit={handleSubmit(onSubmit)}>
				<IonItem>
					<IonInput
						type="text"
						placeholder="Add new comment"
						{...register("text")}
						clearInput
					></IonInput>
					<IonItem>
						<IonLabel>Important</IonLabel>
						<input type="checkbox" {...register("important")} />
					</IonItem>
				</IonItem>
				<IonRow>
					<IonCol>
						<IonButton type="submit">Add Comment</IonButton>
					</IonCol>
				</IonRow>
			</form>
		</IonList>
	)
}
