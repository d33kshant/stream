import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import VideoPage from '../pages/VideoPage'
import '../styles/App.css'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path="/watch" element={<VideoPage />} />
			</Routes>
		</Router>
	)
}

export default App
