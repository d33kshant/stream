import Button from "../components/Button"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import "../styles/VideoPage.css"

const VideoPage = () => {

	const [state, setState] = useState({loadingVID: true, vid: ''})
	const loading = true

	useEffect(() => {
		const url = new URLSearchParams(window.location.search)
		const vid = url.get('v')
		setState({ loadingVID: false, vid})
	}, [])

	if(!state.loadingVID && !state.vid) return <Navigate to="/" />

	return (
		<div className="video-page-container" >
			{ loading ?
			<>
			<div className="video-page-skeleton player">
			</div>
			<div className="video-page-skeleton title"></div>
			<div style={{maxWidth: "40vw"}} className="video-page-skeleton title"></div>
			<div className="video-page-divider"></div>
			<div className="video-page-author-section">
				<div className="video-page-skeleton video-page-author-avatar"></div>
				<div className="video-page-skeleton button"></div>
			</div>
			<div className="video-page-divider"></div>
			</>
			: <>
			<video className="video-page-player" oncontextmenu="return false;" controls controlsList="nodownload" >
				<source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
			</video>
			<h1 className="video-page-title">Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h1>
			<p className="video-page-subtext">50,455,786 views • 12 Jan 2021</p>
			<div className="video-page-divider"></div>
			<div className="video-page-author-section">
				<div className="video-page-author-info">
					<img className="video-page-author-avatar" height="28px" src="https://lh3.googleusercontent.com/a-/AOh14GijgFzkhOy5G02s2gmvAWKzMcWyYEM5lAVwLkc0=s96-c" />
					<a href="/u/" className="video-page-author-name">d33kshant@gmail.com</a>
				</div>
				<div>
					<Button style={{textTransform: "uppercase"}} text="Subscribe" />
				</div>
			</div>
			<div className="video-page-divider"></div>
			<p className="video-page-description">Description</p>
			</>}
		</div>
	)
}

export default VideoPage