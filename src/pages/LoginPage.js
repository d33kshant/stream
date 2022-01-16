import { signInWithRedirect } from 'firebase/auth'
import { useContext, useState } from 'react'
import Button from '../components/Button'
import { ThemeContext } from "../contexts/ThemeContext"
import { auth, provider } from '../firebase'
import "../styles/LoginPage.css"

const LoginPage = () => {

	const { toggleTheme } = useContext(ThemeContext)
	const [loading, setLoading] = useState(false)

	const loginWithGoogle = () => {
		setLoading(true)
		signInWithRedirect(auth, provider)
		.then(res => {
			setLoading(false)
		})
		.catch(error => {
			alert(error)
			setLoading(false)
		})
	}

	return (
		<div className="login-page-container" >
			<div className="login-page-logo" >
				<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
					<rect width="24" height="24" fill="none"/>
					<rect width="8" height="8" transform="translate(8 8)" fill="#fff"/>
					<path d="M20,4H4A2.006,2.006,0,0,0,2,6V18a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V6A2.006,2.006,0,0,0,20,4ZM9.5,14.67V9.33a1,1,0,0,1,1.54-.84l4.15,2.67a1,1,0,0,1,0,1.68l-4.15,2.67A1,1,0,0,1,9.5,14.67Z" fill="red"/>
				</svg>
				ReactTube
			</div>
			<p className="login-page-description">
				ReactTube is place where you can share your video with people you love.
			</p>
			<Button disabled={loading} loading={loading} onClick={loginWithGoogle} text="Login With Google" />
			<button onClick={toggleTheme} >Toggle Theme</button>
		</div>
	)
}

export default LoginPage