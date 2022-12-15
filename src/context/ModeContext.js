import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { Music_App_API_URL } from "../utils/globalVariables";

export const ModeContext = createContext();

export const MyContextProvider = (props) => {
  const [theme, setTheme] = useState("light");
  const [pageName, setPageName] = useState("home");
  const [isLogin, setIsLogin] = useState(false);
  const [author, setAuthor] = useState();
  const [allSongs, setAllSongs] = useState();
  const [distinctSongs, setDistinctSongs] = useState();
  const [nowTrendings, setNowTrendings] = useState();
  const [allArticles, setAllArticles] = useState();
  const [allArtists, setAllArtists] = useState();
  const [allUsers, setAllUsers] = useState();
  const [allVideos, setAllVideos] = useState();
  const [topVideos, setTopVideos] = useState();
  const [randVideos, setRandVideos] = useState();
  const [lyricsLines, setLyricsLines] = useState();

  const getSongs = async () => {
    await axios
      .post(`${Music_App_API_URL}/songs`)
      .then((res) => {
        setAllSongs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getNowTrendings = async () => {
    await axios
      .post(`${Music_App_API_URL}/now-trending`)
      .then((res) => {
        setNowTrendings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getArticles = async () => {
    await axios
      .post(`${Music_App_API_URL}/articles`)
      .then((res) => {
        setAllArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getArtists = async () => {
    await axios
      .post(`${Music_App_API_URL}/artists`)
      .then((res) => {
        setAllArtists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUsers = async () => {
    await axios
      .post(`${Music_App_API_URL}/users`)
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getVideos = async () => {
    await axios
      .post(`${Music_App_API_URL}/videos`)
      .then((res) => {
        setAllVideos(res.data);
        setTopVideos(
          res.data.sort(function (a, b) {
            return a.monthly_views - b.monthly_views;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRandVideos = async () => {
    await axios
      .post(`${Music_App_API_URL}/randVideos`)
      .then((res) => {
        setRandVideos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLyricsLines = async () => {
    await axios
      .post(`${Music_App_API_URL}/lyrics-lines`)
      .then((res) => {
        setLyricsLines(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDistinctSongs = async () => {
    await axios
      .post(`${Music_App_API_URL}/distinct-songs`)
      .then((res) => {
        setDistinctSongs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("author")) {
      const timer = setTimeout(() => {
        localStorage.clear();
        setAuthor("");
        setIsLogin(false);
      }, 1000 * 60 * 60 * 5);
      // remove session after 5 hours
      return () => clearTimeout(timer);
    } else {
      setAuthor(JSON.parse(localStorage.getItem("author")));
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    getSongs();
    getNowTrendings();
    getArticles();
    getArtists();
    getUsers();
    getVideos();
    getRandVideos();
    // getLyricsLines();
    getDistinctSongs();
  }, []);

  return (
    <ModeContext.Provider
      value={{
        theme,
        pageName,
        isLogin,
        author,
        allSongs,
        nowTrendings,
        allArticles,
        allArtists,
        allUsers,
        allVideos,
        topVideos,
        randVideos,
        lyricsLines,
        distinctSongs,
        setTheme,
        setPageName,
        setAllSongs,
        setNowTrendings,
        setAllArticles,
        setAllArtists,
        setAllUsers,
        setAllVideos,
        setTopVideos,
        setRandVideos,
        setLyricsLines,
        setIsLogin,
        setAuthor,
        setDistinctSongs,
      }}
    >
      {props.children}
    </ModeContext.Provider>
  );
};
