import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { genCharArray } from "../utils/globalFuns";
import "../assets/scss/browse.scss";
import Artist from "../components/Artist";
import Card from "../components/ArticlesCard";
import TopWikimizikUser from "../components/TopWikimizikUser";
import { ModeContext } from "../context/ModeContext";

const Browse = () => {
  const alphArr = useState(genCharArray("a", "z"));
  const { allArticles, allArtists } = useContext(ModeContext);

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
                  <span> Artists</span>
                </h3>
              </div>
              <div className="card-columns artists">
                {allArtists?.map((item, index) => {
                  if (index < 9) {
                    return (
                      <Fragment key={index}>
                        <div>
                          <Artist data={item} />
                        </div>
                      </Fragment>
                    );
                  } else {
                    return;
                  }
                })}
              </div>
              <div className="card-columns recent-card">
                {allArticles?.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <Card data={item} />
                    </Fragment>
                  );
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

export default Browse;
