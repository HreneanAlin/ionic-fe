import {
	IonButton,
	IonCol,
	IonContent,
	IonIcon,
	IonInput,
	IonItem,
	IonList,
	IonRow,
	IonText,
} from "@ionic/react"
import { addCircleOutline, refreshOutline } from "ionicons/icons"
import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Link, Redirect } from "react-router-dom"
import { registerUser, sendConfirmUser } from "../../api/api"
import { ConfirmUser, Jwt, UserForRegistration } from "../../interfaces"

const Register: React.FC = () => {
	const { register, handleSubmit } = useForm<UserForRegistration>()
	const [email, setEmail] = useState<string>()
	const [done, setDone] = useState<boolean>(false)
	const [jwt, setJwt] = useState<Jwt | null>(
		JSON.parse(localStorage.getItem("jwt")!)
	)

	const onSubmit = async (data: SubmitHandler<UserForRegistration>) => {
		const confirmUser = (await registerUser(data)) as ConfirmUser
		confirmUser.email = email
		const status = (await sendConfirmUser(confirmUser)) as number
		if (status === 200) {
			setDone(true)
		}
	}
	if (jwt) {
		return <Redirect to="/" />
	}
	if (done) {
		return (
			<IonContent>
				<IonText>
					<h2>
						You are registered, click <Link to="/login">here</Link> to login
					</h2>
				</IonText>
			</IonContent>
		)
	}

	return (
		<IonContent>
			<IonText>
				<h2>Register</h2>
			</IonText>
			<IonList>
				<form method="post" onSubmit={handleSubmit(onSubmit)}>
					<IonItem>
						<IonInput
							placeholder="email"
							{...register("email")}
							onIonChange={e => setEmail(e.detail.value!)}
							clearInput
						></IonInput>
					</IonItem>
					<IonItem>
						<IonInput
							type="password"
							placeholder="password"
							{...register("password")}
							clearInput
						></IonInput>
					</IonItem>
					<IonItem>
						<IonInput
							type="password"
							placeholder="repeat password"
							{...register("confirmPassword")}
							clearInput
						></IonInput>
					</IonItem>
					<IonRow>
						<IonCol className="ion-text-left">
							<IonButton type="submit">
								<IonIcon slot="start" icon={addCircleOutline} />
								Register
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
			</IonList>
			<IonText>
				<p>
					Have an account? <Link to="/login">login</Link>
				</p>
			</IonText>
		</IonContent>
	)
}

export default Register
