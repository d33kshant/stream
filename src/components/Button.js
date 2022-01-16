import "../styles/Button.css"
import Spinner from "./Spinner"

const Button = ({ icon, text, loading, ...props}) => {
	return (
		<button className={"button-main "+(loading ? "button-loading" : "")} {...props} >
			{ loading && <div className="button-spinner-container" ><Spinner color="white" /></div>}
			{ text }
		</button>
	)
}

export default Button