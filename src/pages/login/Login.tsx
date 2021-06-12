import {
	IonContent,
	IonText,
	IonList,
	IonItem,
	IonInput,
	IonRow,
	IonCol,
	IonButton,
	IonIcon,
} from "@ionic/react"
import { addCircleOutline, refreshOutline } from "ionicons/icons"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Redirect } from "react-router"
import { loginUser } from "../../api/api"
import { Jwt, UserForLogin, UserForRegistration } from "../../interfaces"
import { register } from "../../serviceWorkerRegistration"

const Login: React.FC = () => {
	const { register, handleSubmit } = useForm<UserForLogin>()
	const [wrong, setWrong] = useState(false)
	const [done, setDone] = useState(false)
	const onSubmit = async (data: SubmitHandler<UserForLogin>) => {
		try {
			const jwt = (await loginUser(data)) as Jwt
			localStorage.setItem("jwt", JSON.stringify(jwt))
			setDone(true)
		} catch (err) {
			setWrong(true)
		}
	}
	if (done) {
		return <Redirect to="/" />
	}

	return (
		<IonContent>
			{wrong ? <p>Wrong username or password</p> : null}
			<IonText>
				<h2>Login</h2>
			</IonText>
			<IonList>
				<form method="post" onSubmit={handleSubmit(onSubmit)}>
					<IonItem>
						<IonInput
							id="email"
							placeholder="email"
							{...register("email")}
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
					<IonRow>
						<IonCol className="ion-text-left">
							<IonButton type="submit">
								<IonIcon slot="start" icon={addCircleOutline} />
								Login
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
		</IonContent>
	)
}

export default Login
