import { Link } from "react-router-dom"

const VideoComp = props => {
    const { data } = props;
    return (
        <div className="card">
            <div className="post-card">
                <div className="post-card-image">
                    <Link onClick={() => {window.location.replace("http://www.youtube.com/watch?=" + JSON.parse(data).youtube_url)}}>
                        <img src={`https://www.wikimizik.com/ezoimgfmt/img.youtube.com/vi/` + JSON.parse(data).youtube_url + `/0.jpg`} alt="" width="1200" height="1500" />
                    </Link>

                </div>
                <div className="post-card-content">
                    <h6 className="" onClick={() => {window.location.replace("https://google.com")}}>
                        <Link to="">{JSON.parse(data).title}</Link>
                    </h6>
                    <span>{JSON.parse(data).artist}</span>
                </div>
            </div>
        </div>
    )
}

export default VideoComp;