import "../styles/VideoPlayer.css"

const VideoPlayer = ({ v, props }) => {
	return <video autoPlay={true} className="video-player" controls controlsList="nodownload" src={`/api/video/stream?v=${v}`} {...props} />
}

export default VideoPlayer