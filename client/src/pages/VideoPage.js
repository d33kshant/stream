import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import VideoPlayer from "../components/VideoPlayer"

const VideoPage = () => {
	
	const query = new URLSearchParams(useLocation().search)
	const id = query.get('v')
	
	useEffect(() => {
		fetch(`/api/video/view/${id}`)
		.then(()=>console.log('Views++'))
	}, [])

	return (
		<div className="video-page-container">
			<VideoPlayer v={id} />
		</div>
	)
}

export default VideoPage