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
import Loading from "../components/Loading";

const Lyrics = () => {
  const { id } = useParams();
  const { allArticles, allSongs } = useContext(ModeContext);
  const [songData, setSongData] = useState();
  const [lyricsArray, setLyricsArray] = useState();
  const [songDetail, setSongDetail] = useState();
  const [loading, setLoading] = useState(false);

  // console.log(allSongs, "allSongs");

  useEffect(() => {
    getSongData();
  }, [allSongs]);

  useEffect(() => {
    setLoading(true);
    getAllData();
  }, [songData]);

  const getSongData = () => {
    const item = allSongs?.filter((data) => {
      return data.title === id;
    });
    if (item) {
      setSongData(item[0]);
    }
  };

  const getAllData = async () => {
    if (songData?.id > 0) {
      let data = new FormData();
      data.append("id", songData?.id);

      await axios
        .post(`${Music_App_API_URL}/edit-song`, data)
        .then((res) => {
          setLoading(false);
          setSongDetail(res.data.song_detail[0]);
          setLyricsArray(res.data.lyrics_lines);
          console.log(res.data, "allData");
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                  <li className="">{songDetail?.views} views</li>
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
                      Genre: <b>{songDetail?.genre}</b>
                    </h5>
                  </div>
                  <div>
                    <h5>
                      Album: <b>{songDetail?.album}</b>
                    </h5>
                  </div>
                  <div>
                    <h5>
                      Year: <b>{songDetail?.year}</b>
                    </h5>
                  </div>
                </div>
                {loading && <Loading />}
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
