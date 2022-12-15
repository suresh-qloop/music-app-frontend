import TopWikimizikUser from "../components/TopWikimizikUser";
import "../assets/scss/lyrics.scss";
import { Link, useParams } from "react-router-dom";
import ArticlesCard from "../components/ArticlesCard";
import Iframe from "react-iframe";
import { ModeContext } from "../context/ModeContext";
import { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Music_App_API_URL } from "../utils/globalVariables";
import HighLyricsLine from "../components/HighLyricsLine";
import ReactPlayer from "react-player";

const Lyrics = () => {
  const { id } = useParams();
  const { allArticles, allSongs } = useContext(ModeContext);
  const [songData, setSongData] = useState();
  const [lyricsArray, setLyricsArray] = useState();

  console.log(songData, "songData");

  useEffect(() => {
    getSongData();
  }, [id]);

  useEffect(() => {
    getLyricsData();
  }, [songData]);

  const getSongData = () => {
    const item = allSongs?.filter((data) => {
      return data.title === id;
    });
    setSongData(item[0]);
  };

  const getLyricsData = async () => {
    await axios
      .post(`${Music_App_API_URL}/lyrics-lines`, { id: songData?.id })
      .then((res) => {
        setLyricsArray(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="lyrics">
      <section className="section masonry-layout pt-45">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="categorie-title">
                <h3>
                  <span> {id} </span>
                </h3>
                <ul className="list-inline">
                  <li className="">{songData?.views} viewsss</li>
                  <li className="dot"></li>
                  <li className="">
                    <Link to={`/edit-lyrics/${id}`}>Edit</Link>
                  </li>
                </ul>
              </div>
              <div className="post-single">
                <div className="song-detail">
                  <div>
                    <h5>
                      Genre: <b>{songData?.genre}</b>
                    </h5>
                  </div>
                  <div>
                    <h5>
                      Album: <b>{songData?.album}</b>
                    </h5>
                  </div>
                  <div>
                    <h5>
                      Year: <b>{songData?.year}</b>
                    </h5>
                  </div>
                </div>
                <div className="Verse mt-5">
                  {lyricsArray?.map((item, index) => {
                    if (item.comment === "false") {
                      return <p key={index}>{item.line_txt}</p>;
                    } else {
                      return (
                        <Fragment key={index}>
                          <HighLyricsLine item={item} />
                        </Fragment>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="card-columns recent-card mt-5">
                {allArticles?.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <ArticlesCard data={item} />
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <div className="col-md-4">
              <div className="widget">
                {/* <iframe
                  src={`http://www.youtube.com/watch?v=${songData?.youtube_url}`}
                  id=""
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                  className=""
                  display="block"
                  position="relative"
                ></iframe> */}
                {/* <ReactPlayer
                  width="17.5vw"
                  height="25vh"
                  url={`http://www.youtube.com/watch?v=${songData?.youtube_url}`}
                /> */}
                <audio autoPlay>
                  <source
                    src={`http://www.youtube.com/watch?v=${songData?.youtube_url}`}
                  />
                </audio>
              </div>
              <TopWikimizikUser />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lyrics;
