import React, { useContext, useEffect } from "react";
import { LevelContext } from "../../Context/LevelContext";
import { Link, useNavigate } from "react-router-dom";
import * as Images from "../../assets/imagesExport";
import SVGComponent from "../../components/SVGComponent/SVGComponent";
import Github from "../../assets/github.svg";
import Twitter from "../../assets/twitter.svg";

import "./HomePage.css";

const HomePage = () => {
  const { levels, setCurrentLevel } = useContext(LevelContext);

  const navigate = useNavigate();

  /*---- open last seen slide when user revists the website------*/

  useEffect(() => {
    const lastSeenSlide = localStorage.getItem("lastSeenSlide");

    if (lastSeenSlide) {
      const { level, slide } = JSON.parse(lastSeenSlide);
      const urlPath = `/level${level}/${slide}`;
      if (!level) {
        navigate("/");
      } else {
        navigate(urlPath);
      }
    }
  }, []);

  const handleCurrentLevelClick = (levelNumber) => {
    setCurrentLevel(levelNumber);
  };

  return (
    <>
      <div className="header">
        <h5>Level Climber</h5>

        <div className="socials">
          <Link
            to="https://github.com/avinash-tallapaneni"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Github} alt="Github icon" />
          </Link>
          <Link
            to="https://twitter.com/TallapaneniAvi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Twitter} alt="Twitter icon" />
          </Link>
        </div>
      </div>

      <div className="level_container">
        {levels.map((level) => {
          const { level: levelNumber, finished } = level;
          const levelClass = finished ? "cleared" : "not_cleared";
          const imageSrc = Images[`Image${levelNumber}`];
          const levelText = `Level ${levelNumber}`;
          // const slideLength = Object.keys(
          //   PlaceholderSlides.filter(
          //     (placeholder) => placeholder.level === levelNumber
          //   )[0].slides
          // ).length;

          // const levelCheck =
          //   levelNumber === 1 && activeLevel === 1
          //     ? "1"
          //     : levelNumber === 1
          //     ? `${slideLength}`
          //     : finished
          //     ? "1"
          //     : `${slideLength}`;

          const levelCheck = "1";

          return (
            <div className={`level_icon ${levelClass}`} key={levelNumber}>
              <Link
                to={`/level${levelNumber}/${levelCheck}`}
                onClick={() => handleCurrentLevelClick(levelNumber)}
              >
                <div className={`spline ${levelNumber}`}>
                  <img src={imageSrc} alt={levelText} />
                  <p>{levelText}</p>
                </div>
              </Link>
            </div>
          );
        })}
        <SVGComponent levels={levels} />
      </div>
    </>
  );
};

export default HomePage;
