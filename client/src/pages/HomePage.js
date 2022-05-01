import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import VideoCard from "../components/VideoCard"
import VideoSkeleton from "../components/VideoSkeleton"
import "../styles/HomePage.css"

const HomePage = () => {
	
	const [videos, setVideos] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const getVideos =  async () => {
			const response = await fetch('/api/video/')
			const data = await response.json()
			setLoading(false)
			if (data.error) {
				return alert(data.error)
			}
			setVideos(data)
		}
		getVideos()
	}, [])

	return (
		<>
			<NavBar />
			<div className="home-page-container">
				<div className="home-video-grid">
					{loading ? 
					<>
						<VideoSkeleton />
						<VideoSkeleton />
						<VideoSkeleton />
						<VideoSkeleton />
						<VideoSkeleton />
					</> : videos.map((video, index)=><VideoCard key={index} {...video}/>) }
				</div>
			</div>
		</>
	)
}

export default HomePage