import VideoComp from "../components/VideoComp";
import TopWikimizikUser from "../components/TopWikimizikUser";
import "../assets/scss/videoPage.scss";
import { useContext } from "react";
import { ModeContext } from "../context/ModeContext";

const VideoPage = () => {
  const { topVideos, randVideos } = useContext(ModeContext);
  return (
    <div className="video">
      <section className="section masonry-layout pt-45">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="categorie-title">
                <h3>
                  <span> Top Videos Today </span>
                </h3>
              </div>
              <div className="card-columns videosToday">
                {topVideos?.map((item, index) => {
                  if (index < 6) {
                    return (
                      <div key={index}>
                        <VideoComp data={JSON.stringify(item)} />
                      </div>
                    );
                  }
                })}
              </div>
              <div className="categorie-title">
                <h3>
                  <span>Random Picks</span>
                </h3>
              </div>
              <div className="card-columns videosToday">
                {randVideos?.map((item, index) => {
                  if (index < 6) {
                    return (
                      <div key={index}>
                        <VideoComp data={JSON.stringify(item)} />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="col-md-4">
              <TopWikimizikUser />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoPage;
