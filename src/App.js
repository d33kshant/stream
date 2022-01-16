import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom"
import AuthProvider from "./contexts/AuthContext"
import ThemeProvider from "./contexts/ThemeContext"
import ErrorPage from "./pages/ErrorPage"
import HomePage from "./pages/HomePage"
import LoadingPage from "./pages/LoadingPage"
import LoginPage from "./pages/LoginPage"
import { auth } from "./firebase"

function App() {

	const [theme, setTheme] = useState('light')
	const [ user, loading, error ] = useAuthState(auth)

	const toggleTheme = () => {
		if (theme === 'light')
			return setTheme('dark')
		setTheme('light')
	}

	if (loading) return <LoadingPage />
	if (error) return <ErrorPage />
	if (!user) return <LoginPage />

	return (
		<div className={`app ${theme}`} >
			<ThemeProvider value={{ theme, toggleTheme }} >
				<AuthProvider value={{user}} >
					<Router>
						<Routes>
							<Route path="/" element={<HomePage />} />
						</Routes>
					</Router>
				</AuthProvider>
			</ThemeProvider>
		</div>
	)
}

export default App
