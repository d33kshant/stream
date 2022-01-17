import { useEffect, useState } from "react"
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
import AppBar from "./components/AppBar"
import VideoPage from "./pages/VideoPage"
import "./styles/App.css"

function App() {

	const [theme, setTheme] = useState('light')
	const [ user, loading, error ] = useAuthState(auth)

	useEffect(() => {
		const theme = localStorage.getItem('theme')
		if (theme === 'dark') {
			setTheme('dark')
			document.body.classList.add('dark')
		} else {
			setTheme('light')
			document.body.classList.add('light')
		}
	}, [])

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
		localStorage.setItem('theme', theme)
	}

	if (loading) return <ThemeProvider value={{ theme, toggleTheme }} ><LoadingPage /></ThemeProvider>
	if (error) return <ThemeProvider value={{ theme, toggleTheme }}><ErrorPage /></ThemeProvider>
	if (!user) return <ThemeProvider value={{ theme, toggleTheme }}><LoginPage /></ThemeProvider>

	return (
		<ThemeProvider value={{ theme, toggleTheme }} >
			<AuthProvider value={{user}} >
				<AppBar />
				<div className="app-container" >
					<Router>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/watch" element={<VideoPage />} />
						</Routes>
					</Router>
				</div>
			</AuthProvider>
		</ThemeProvider>
	)
}

export default App
