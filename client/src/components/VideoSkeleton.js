import "../styles/VideoSkeleton.css"

const VideoSkeleton = () => {
	return (
		<div className="video-skeleton-container">
			<div className="video-skeleton-thumbnail"></div>
			<div className="video-skeleton-title"></div>
			<div className="video-skeleton-info"></div>
		</div>
	)
}

export default VideoSkeleton