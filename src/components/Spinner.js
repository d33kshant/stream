import "../styles/Spinner.css"

const Spinner = ({color, ...props}) => {
	return (
		<svg className="spinner-main" {...props} >
			<path d="M12 21a9 9 0 1 0-9-9" fill="none" stroke={color || "gray"} strokeWidth="2" strokeLinecap="round"></path>
		</svg>
	)
}

export default Spinner