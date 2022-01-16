import Button from '../components/Button'
import { loginWithGoogle } from '../firebase'

const LoginPage = () => {
	return (
		<div>
			<Button onClick={loginWithGoogle} text="Login With Google" />
		</div>
	)
}

export default LoginPage