import { Link } from "react-router-dom"
import "../styles/VideoCard.css"

const VideoCard = ({ title, thumbnail, author, vid, time, views }) => {
	return (
		<Link className="video-card-container" to={`/watch?v=${vid}`}>
			<img width="100%" className="video-card-thumb" src={thumbnail} alt={title} />
			<h3 className="video-card-title">{title}</h3>
			<p className="video-card-info">{Math.floor(views/2)} views, {(new Date(time)).toDateString()} • {author}</p>
		</Link>
	)
}

export default VideoCard