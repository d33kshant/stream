import "../styles/NavBar.css"

const NavBar = () => {
	return (
		<nav className="navbar-container">
			<a href="/" className="navbar-logo">
				<svg xmlns="http://www.w3.org/2000/svg" fill="red" height="20" width="20"><path d="M8.062 13.417 13.375 10 8.062 6.583ZM4.5 17.083Q3.833 17.083 3.375 16.625Q2.917 16.167 2.917 15.5V4.5Q2.917 3.833 3.375 3.375Q3.833 2.917 4.5 2.917H15.5Q16.167 2.917 16.625 3.375Q17.083 3.833 17.083 4.5V15.5Q17.083 16.167 16.625 16.625Q16.167 17.083 15.5 17.083Z"/></svg>
				Stream
			</a>
		</nav>
	)
}

export default NavBar