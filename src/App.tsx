import { Redirect, Route } from "react-router-dom"
import {
	IonApp,
	IonButton,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonRouterOutlet,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import Home from "./pages/Home"
import { calculatorOutline, refreshOutline } from "ionicons/icons"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

/* Theme variables */
import "./theme/variables.css"
import React, { useState, useEffect } from "react"
import { getMovies } from "./api/api"
import Movie from "./pages/movie/MovieDetail"

const App: React.FC = () => {
	return (
		<IonApp>
			{/* <IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Our Movies</IonTitle>
				</IonToolbar>
			</IonHeader> */}
			<IonReactRouter>
				<IonRouterOutlet>
					<Route path="/movies" exact>
						<Home />
					</Route>
					<Route path="/movies/:id">
                         <Movie/>
					</Route>
					<Redirect exact from="/" to="/movies" />
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	)
}
export default App
