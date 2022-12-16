import { Fragment, useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { genCharArray } from "../utils/globalFuns";
import "../assets/scss/browse.scss";
import TopWikimizikUser from "../components/TopWikimizikUser";
import { ModeContext } from "../context/ModeContext";
import { useEffect } from "react";
import axios from "axios";
import { Music_App_API_URL } from "../utils/globalVariables";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState();
  const alphArr = useState(genCharArray("a", "z"));
  const { allSongs } = useContext(ModeContext);

  const query = searchParams.get("search_query");

  const getSearchResult = async () => {
    await axios
      .get(`${Music_App_API_URL}/search-result?search_query=${query}`)
      .then((res) => {
        console.log(res.data);
        setSearchResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSearchResult();
  }, [query]);

  return (
    <div className="browse">
      <section className="section masonry-layout pt-45">
        <div className="container-fluid">
          <div className="alphaOrder pagination mt-30">
            <ul className="list-inline">
              <li>
                <Link to="">#</Link>
              </li>
              {alphArr[0].map((item, index) => {
                return (
                  <Fragment key={index}>
                    <li>
                      <Link to={`/${item}`}>{item}</Link>
                    </li>
                  </Fragment>
                );
              })}
            </ul>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="categorie-title">
                <h3>
                  <span>{query}</span>
                </h3>
              </div>
              <ul className="widget-latest-posts">
                {searchResult?.map((item, index) => {
                  if (index < 10) {
                    return (
                      <Fragment key={index}>
                        <li className="last-post">
                          <div className="content">
                            <p>
                              <Link to={`/lyrics/${item.title}`}>
                                <b>{item.title} - </b>
                                {item.artist}
                              </Link>
                            </p>
                            <small>
                              <span className="icon_clock_alt"></span>
                              {item.year}
                            </small>
                          </div>
                        </li>
                      </Fragment>
                    );
                  }
                })}
                {}
              </ul>
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

export default SearchResult;
