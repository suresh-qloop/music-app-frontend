import TopWikimizikUser from "../components/TopWikimizikUser";
import "../assets/scss/addNewSong.scss";
import { Fragment, useContext, useEffect, useState } from "react";
import { ModeContext } from "../context/ModeContext";
import axios from "axios";
import { Music_App_API_URL } from "../utils/globalVariables";
import { useNavigate, useParams } from "react-router-dom";

const AddNewSong = () => {
  const { id } = useParams();
  const [songData, setSongData] = useState();
  const { distinctSongs, author, allSongs } = useContext(ModeContext);
  const [selectOption, setSelectOption] = useState("false");
  const [songTitle, setSongTitle] = useState();
  const [artist, setArtist] = useState();
  const [featuredArtist, setFeaturedArtist] = useState();
  const [producer, setProducer] = useState();
  const [lyricsBy, setLyricsBy] = useState();
  const [album, setAlbum] = useState();
  const [year, setYear] = useState();
  const [genre, setGenre] = useState();
  const [soundCloundURL, setSoundCloundURL] = useState();
  const [spotifyURL, setSpotifyURL] = useState();
  const [youtubeURL, setYoutubeURL] = useState();
  const [lyrics, setLyrics] = useState([{ line_txt: "" }]);
  const navigate = useNavigate();

  console.log(lyrics, "Lyrics");

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...lyrics];
    list[index][name] = value;
    setLyrics(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...lyrics];
    list.splice(index, 1);
    setLyrics(list);
  };

  const handleServiceAdd = () => {
    setLyrics([...lyrics, { line_txt: "" }]);
  };

  useEffect(() => {
    getSongData();
  }, [allSongs]);

  const handleOptionChange = (changeEvent) => {
    setSelectOption(changeEvent.target.value);
    console.log(selectOption);
  };

  const yearsHandle = () => {
    const yearArray = [];
    for (var i = 2022; i >= 1950; i--) {
      yearArray.push(<option key={i}> {i} </option>);
    }
    return yearArray;
  };

  const getSongData = () => {
    const item = allSongs?.filter((data) => {
      return data.title === id;
    });
    console.log(item, "ITEM");
    if (item) {
      setSongData(item[0]);
    }
    // console.log(item[0], "ADD");
  };

  const genreDatas = [
    "Afro/Dancehall",
    "Bolero",
    "Folklore",
    "Haltian Jazz",
    "Kanaval",
    "Konpa",
    "Raboday",
    "Ragga/Rap/Hip-Hop",
    "Rasin",
    "Reggare",
    "Gospel",
    "Twoubadou",
    "Zouk",
    "Other",
  ];

  const handleSubmit = async () => {
    if (author) {
      add_new_song_func();
    } else {
      alert("You must sign in so that you add song.");
      navigate("/sign-in");
    }
  };

  const add_new_song_func = async () => {
    await axios
      .post(`${Music_App_API_URL}/add-new-song`, {
        title: songTitle,
        artist: artist,
        feat_artist: featuredArtist,
        producer: producer,
        lyrics_by: lyricsBy,
        album: album,
        year: year,
        genre: genre,
        youtube_url: youtubeURL,
        soundcloud_url: soundCloundURL,
        spotify_url: spotifyURL,
        video: selectOption,
        author: author.id,
        totalPoints: author.total_pts,
        lyrics: lyrics,
      })
      .then((res) => {
        if (res.data === 1) {
          alert("Success!");
          navigate("/");
        } else {
          alert("Please try to add new song");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      setSongTitle(songData?.title);
      setArtist(songData?.artist);
      setFeaturedArtist(songData?.feat_artist);
      setProducer(songData?.producer);
      setLyricsBy(songData?.lyrics_by);
      setAlbum(songData?.album);
      setYear(songData?.year);
      setGenre(songData?.genre);
      setSpotifyURL(songData?.spotify_url);
      setYoutubeURL(songData?.youtube_url);
      setSoundCloundURL(songData?.soundcloud_url);
      setSelectOption(songData?.video);
    } else {
      console.log("Add Lyrics");
    }
  }, [allSongs]);

  return (
    <div className="addNewSong">
      <section className="section masonry-layout pt-45">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="categorie-title">
                <h3>
                  <span> {id ? "Edit Song" : "Add New Song"} </span>
                </h3>
              </div>

              <form className="mb-5 widget-form">
                <div className="form-group">
                  <label htmlFor="song_title">
                    <b>Song Title</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="song_title"
                    placeholder="Song Title *"
                    value={songTitle}
                    // value={!id ? songTitle : songData?.title}
                    onChange={(e) => {
                      setSongTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="artist">
                    <b>Artist</b>
                  </label>
                  <select
                    className="form-control"
                    name="genre"
                    style={{ padding: "8px 20px", height: "46px" }}
                    onChange={(e) => {
                      setArtist(e.target.value);
                    }}
                    value={artist}
                  >
                    {distinctSongs?.map((data, index) => {
                      if (index < 150) {
                        return (
                          <Fragment key={index}>
                            <option key={index}>{data.artist}</option>
                          </Fragment>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="featured_artist">
                    <b>Featured Artist</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="featured_artist"
                    placeholder="Featured Artist *"
                    value={featuredArtist}
                    onChange={(e) => {
                      setFeaturedArtist(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="producer">
                    <b>Producer</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="producer"
                    placeholder="Producer *"
                    value={producer}
                    onChange={(e) => {
                      setProducer(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lyricsBy">
                    <b>Lyrics By</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lyricsBy"
                    placeholder="Lyrics By *"
                    value={lyricsBy}
                    onChange={(e) => {
                      setLyricsBy(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="album">
                    <b>Album</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="album"
                    placeholder="Album *"
                    value={album}
                    onChange={(e) => {
                      setAlbum(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="year">
                    <b>Year</b>
                  </label>
                  <select
                    className="form-control"
                    id="year"
                    style={{ padding: "8px 20px", height: "46px" }}
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                    value={year}
                  >
                    {yearsHandle()}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="genre">
                    <b>Genre</b>
                  </label>
                  <select
                    className="form-control"
                    name="genre"
                    style={{ padding: "8px 20px", height: "46px" }}
                    onChange={(e) => {
                      setGenre(e.target.value);
                    }}
                    value={genre}
                  >
                    {genreDatas.map((data, index) => {
                      return <option key={index}>{data}</option>;
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="soundCloudURL">
                    <b>SoundCloud URL</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="soundCloudURL"
                    placeholder="SoundCloud URL *"
                    value={soundCloundURL}
                    onChange={(e) => {
                      setSoundCloundURL(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="spotifyURL">
                    <b>Spotify URL</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="spotifyURL"
                    placeholder="Spotify URL *"
                    value={spotifyURL}
                    onChange={(e) => {
                      setSpotifyURL(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="youtubeURL">
                    <b>You Tube URL</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="youtubeURL"
                    placeholder="You Tube URL *"
                    value={youtubeURL}
                    onChange={(e) => {
                      setYoutubeURL(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <b>This You Tube video is the:</b>
                  </label>
                  <br />
                  <div className="ml-5 custom-control custom-checkbox">
                    <input
                      type="radio"
                      id="video-track"
                      className="custom-control-input"
                      value="true"
                      onChange={handleOptionChange}
                      checked={selectOption === "true"}
                    />
                    <label
                      htmlFor="video-track"
                      className="custom-control-label"
                    >
                      Official video of the song
                    </label>
                  </div>
                  <div className="ml-5 custom-control custom-checkbox">
                    <input
                      type="radio"
                      id="audio-track"
                      className="custom-control-input"
                      value="false"
                      onChange={handleOptionChange}
                      checked={selectOption === "false"}
                    />
                    <label
                      htmlFor="audio-track"
                      className="custom-control-label"
                    >
                      Audio track of the song
                    </label>
                    <br />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    <b>Lyrics</b>
                  </label>
                  <br />
                  <small>
                    <i>
                      if you don't want a line to be able ot receive
                      annotations, put it between a pair of brackets "[]"
                    </i>
                    <br />
                    <i>
                      For example: [Verse 2], [Chorus], [Piano lead], [Refrain],
                      [x2], [Richie]
                    </i>
                  </small>
                  <br />
                  {lyrics.map((singleLyrics, index) => (
                    <div key={index} className="services row">
                      <div className="col-8 my-3">
                        <input
                          name="line_txt"
                          className="form-control "
                          type="text"
                          id="line_txt"
                          value={singleLyrics.line_txt}
                          onChange={(e) => handleServiceChange(e, index)}
                          required
                        />
                        {lyrics.length - 1 === index && (
                          <button
                            type="button"
                            onClick={handleServiceAdd}
                            className="btn btn-primary mt-3"
                          >
                            <span>Add a Lyrics</span>
                          </button>
                        )}
                      </div>
                      <div className="col-4 my-3">
                        {lyrics.length !== 1 && (
                          <button
                            type="button"
                            onClick={() => handleServiceRemove(index)}
                            className="btn btn-danger"
                          >
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn-custom"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
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

export default AddNewSong;
