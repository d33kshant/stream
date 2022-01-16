import { useContext } from "react"
import Spinner from "../components/Spinner"
import { ThemeContext } from "../contexts/ThemeContext"
import "../styles/LoadingPage.css"

const LoadingPage = () => {

	const { theme } = useContext(ThemeContext)

	return (
		<div className="loading-page-container" >
			<div className="loading-page-logo" >
				<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
					<rect width="24" height="24" fill="none"/>
					<rect width="8" height="8" transform="translate(8 8)" fill="#fff"/>
					<path d="M20,4H4A2.006,2.006,0,0,0,2,6V18a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V6A2.006,2.006,0,0,0,20,4ZM9.5,14.67V9.33a1,1,0,0,1,1.54-.84l4.15,2.67a1,1,0,0,1,0,1.68l-4.15,2.67A1,1,0,0,1,9.5,14.67Z" fill="red"/>
				</svg>
			</div>
			<Spinner color={ theme === "dark" ? "#aaa" : "#626262" } />
		</div>
	)
}

export default LoadingPage