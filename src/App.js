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
		if (theme === 'light'){
			document.body.classList.add('dark')
			document.body.classList.remove('light')
			setTheme('dark')
		} else {
			document.body.classList.add('light')
			document.body.classList.remove('dark')
			setTheme('light')
		}
	}

	if (loading) return <ThemeProvider value={{ theme, toggleTheme }} ><LoadingPage /></ThemeProvider>
	if (error) return <ThemeProvider value={{ theme, toggleTheme }}><ErrorPage /></ThemeProvider>
	if (!user) return <ThemeProvider value={{ theme, toggleTheme }}><LoginPage /></ThemeProvider>

	return (
		<ThemeProvider value={{ theme, toggleTheme }} >
			<AuthProvider value={{user}} >
				<Router>
					<Routes>
						<Route path="/" element={<HomePage />} />
					</Routes>
				</Router>
			</AuthProvider>
		</ThemeProvider>
	)
}

export default App
